import { shuffle, insertAfter } from './utils.js'

/**
 * 答题控制器
 */
export function createQuiz(questions, config, onComplete) {
  // 移除随机打乱，保持题目顺序（从早到晚的时间线）
  const mainQuestions = [...questions.main]
  const foodCourtQ = questions.special.find((q) => q.id === 'food_court_q')
  const lotusGateQ = questions.special.find((q) => q.id === 'lotus_gate_q22')

  let queue = [...mainQuestions]
  let current = 0
  let answers = {}
  
  // 记录是否触发了隐藏结局，以及触发了哪一个（'FAKE_END' 或 'TRUE_END'）
  let hiddenEnd = null

  const els = {
    fill: document.getElementById('progress-fill'),
    text: document.getElementById('progress-text'),
    qText: document.getElementById('question-text'),
    options: document.getElementById('options'),
  }

  function totalCount() {
    return queue.length
  }

  function updateProgress() {
    const pct = (current / totalCount()) * 100
    els.fill.style.width = pct + '%'
    els.text.textContent = `${current} / ${totalCount()}`
  }

  function renderQuestion() {
    const q = queue[current]
    els.qText.textContent = q.text

    els.options.innerHTML = ''
    q.options.forEach((opt) => {
      const btn = document.createElement('button')
      btn.className = 'btn btn-option'
      btn.textContent = opt.label
      btn.addEventListener('click', () => selectOption(q, opt))
      els.options.appendChild(btn)
    })

    updateProgress()
  }

  function selectOption(question, option) {
    // 记录答案（如果是隐藏题，它的 value 是字符串，不需要记入常规得分）
    if (typeof option.value === 'number') {
      answers[question.id] = option.value
    }

    // 美食城分支：如果在 q18 选择了“推开门走了进去”（value: 2），则在下一题插入美食城内部的题目
    if (question.id === 'q18' && option.value === 2) {
      if (foodCourtQ && !queue.find(q => q.id === 'food_court_q')) {
        queue = insertAfter(queue, 'q18', foodCourtQ)
      }
    }

    // 莲花门：如果在 q19 选择了特定的选项（凝视莲花），则在队列末尾插入隐藏题 q22
    if (question.id === config.lotusGate.questionId && option.value === config.lotusGate.triggerValue) {
      if (lotusGateQ && !queue.find(q => q.id === 'lotus_gate_q22')) {
        queue.push(lotusGateQ)
      }
    }

    // 隐藏结局判定：如果当前是隐藏题 q22，记录玩家的选择
    if (question.id === 'lotus_gate_q22') {
      hiddenEnd = option.value // 'FAKE_END' 或 'TRUE_END'
    }

    current++
    if (current >= totalCount()) {
      onComplete(answers, hiddenEnd)
    } else {
      renderQuestion()
    }
  }

  function start() {
    current = 0
    answers = {}
    hiddenEnd = null
    queue = [...questions.main]
    renderQuestion()
  }

  return { start, renderQuestion }
}
