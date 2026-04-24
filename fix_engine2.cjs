const fs = require('fs');

let engine = fs.readFileSync('src/engine.js', 'utf8');

// Change the logic to directly output L, M, H based on average score 1-3.
// Average score is between 1 and 3.
// L: 1 to 1.66
// M: 1.67 to 2.33
// H: 2.34 to 3

engine = engine.replace(
  `    // Calculate average (1-3) and multiply by 5 to keep the 5-15 range for thresholds
    finalScores[dim] = (scores[dim].sum / scores[dim].count) * 5;`,
  `    // Calculate pure average (1-3)
    finalScores[dim] = scores[dim].sum / scores[dim].count;`
);

engine = engine.replace(
  `export function scoresToLevels(scores, thresholds) {
  const levels = {}
  for (const [dim, score] of Object.entries(scores)) {
    if (score <= thresholds.L[1]) levels[dim] = 'L'
    else if (score >= thresholds.H[0]) levels[dim] = 'H'
    else levels[dim] = 'M'
  }
  return levels
}`,
  `export function scoresToLevels(scores, thresholds) {
  const levels = {}
  for (const [dim, score] of Object.entries(scores)) {
    // Pure average is between 1.0 and 3.0
    if (score < 1.67) levels[dim] = 'L'
    else if (score > 2.33) levels[dim] = 'H'
    else levels[dim] = 'M'
  }
  return levels
}`
);

fs.writeFileSync('src/engine.js', engine);
console.log('Engine updated.');
