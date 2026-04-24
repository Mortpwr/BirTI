/**
 * SBTI 评分引擎 — 纯函数，无 DOM 依赖
 */

/**
 * 按维度求和：每维度 3 题，分值相加 (范围 3-9)
 * @param {Object} answers  { q1: 2, q3: 1, ... }
 * @param {Array}  questions 题目定义数组
 * @returns {Object} { S1: 5, S2: 3, ... }
 */
export function calcDimensionScores(answers, questions) {
  const scores = {}
  for (const q of questions) {
    if (answers[q.id] == null) continue
    if (!scores[q.dim]) scores[q.dim] = { sum: 0, count: 0 };
    scores[q.dim].sum += answers[q.id];
    scores[q.dim].count += 1;
  }
  const finalScores = {};
  for (const dim in scores) {
    if (dim === 'NONE' || dim === 'SPECIAL') continue;
    // Calculate pure average (1-3)
    finalScores[dim] = scores[dim].sum / scores[dim].count;
  }
  return finalScores;
}

/**
 * 原始分 → L/M/H 等级
 * @param {Object} scores      { S1: 5, ... }
 * @param {Object} thresholds  { L: [3,4], M: [5,7], H: [8,9] }
 * @returns {Object} { S1: 'H', S2: 'L', ... }
 */
export function scoresToLevels(scores, thresholds) {
  const levels = {}
  for (const [dim, score] of Object.entries(scores)) {
    // Pure average is between 1.0 and 3.0
    if (score < 1.67) levels[dim] = 'L'
    else if (score > 2.33) levels[dim] = 'H'
    else levels[dim] = 'M'
  }
  return levels
}

/**
 * 等级 → 数值 (L=1, M=2, H=3)
 */
const LEVEL_NUM = { L: 1, M: 2, H: 3 }

/**
 * 解析人格类型的 pattern 字符串
 * "H-H-H-H" → ['H','H','H','H']
 */
export function parsePattern(pattern) {
  return pattern.replace(/-/g, '').split('')
}

/**
 * 计算用户向量与类型 pattern 的曼哈顿距离
 * @param {Object} userLevels  { S1: 'H', S2: 'L', ... }
 * @param {Array}  dimOrder    ['E','V','R','A']
 * @param {string} pattern     "H-H-H-H"
 * @returns {{ distance: number, exact: number, similarity: number }}
 */
export function matchType(userLevels, dimOrder, pattern) {
  const typeLevels = parsePattern(pattern)
  let distance = 0
  let exact = 0

  for (let i = 0; i < dimOrder.length; i++) {
    const userVal = LEVEL_NUM[userLevels[dimOrder[i]]] || 2
    const typeVal = LEVEL_NUM[typeLevels[i]] || 2
    const diff = Math.abs(userVal - typeVal)
    distance += diff
    if (diff === 0) exact++
  }

  const maxDist = dimOrder.length * 2;
  const similarity = Math.max(0, Math.round((1 - distance / maxDist) * 100))
  return { distance, exact, similarity }
}

/**
 * 匹配所有类型，排序，应用特殊覆盖
 * @param {Object}  userLevels   { S1: 'H', ... }
 * @param {Array}   dimOrder     维度顺序
 * @param {Array}   standardTypes 标准类型数组
 * @param {Array}   specialTypes  特殊类型数组
 * @param {Object}  options      { hiddenEnd: 'FAKE_END' | 'TRUE_END' | null }
 * @returns {{ primary: Object, secondary: Object|null, rankings: Array, mode: string }}
 */
export function determineResult(userLevels, dimOrder, standardTypes, specialTypes, options = {}) {
  const rankings = standardTypes.map((type) => ({
    ...type,
    ...matchType(userLevels, dimOrder, type.pattern),
  }))

  // 排序：距离升序 → 精准命中降序 → 相似度降序
  rankings.sort((a, b) => a.distance - b.distance || b.exact - a.exact || b.similarity - a.similarity)

  const best = rankings[0]

  // 如果触发了隐藏结局（FAKE_END 或 TRUE_END），直接覆盖常规结算
  if (options.hiddenEnd) {
    const hiddenType = specialTypes.find((t) => t.code === options.hiddenEnd)
    if (hiddenType) {
      return {
        primary: { ...hiddenType, similarity: 100, exact: dimOrder.length },
        secondary: best,
        rankings,
        mode: 'special',
      }
    }
  }

  // 常规结算
  return {
    primary: best,
    secondary: rankings[1] || null,
    rankings,
    mode: 'normal',
  }
}
