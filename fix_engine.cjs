const fs = require('fs');

// We need to change calcDimensionScores to calculate the average score per dimension (1-3)
// and then scale it up to a standard range (e.g. out of 15) so the rest of the code works,
// OR we just change the thresholds to work with averages.
// Let's just calculate the average and scale it to 1-3, and update thresholds to match 1-3.
// Actually, it's easier to just calculate the average and multiply by 5 (so it's out of 15).

let engine = fs.readFileSync('src/engine.js', 'utf8');

engine = engine.replace(
  'scores[q.dim] = (scores[q.dim] || 0) + answers[q.id]',
  `if (!scores[q.dim]) scores[q.dim] = { sum: 0, count: 0 };
    scores[q.dim].sum += answers[q.id];
    scores[q.dim].count += 1;`
);

engine = engine.replace(
  'return scores',
  `const finalScores = {};
  for (const dim in scores) {
    if (dim === 'NONE' || dim === 'SPECIAL') continue;
    // Calculate average (1-3) and multiply by 5 to keep the 5-15 range for thresholds
    finalScores[dim] = (scores[dim].sum / scores[dim].count) * 5;
  }
  return finalScores;`
);

fs.writeFileSync('src/engine.js', engine);
console.log('Engine updated.');
