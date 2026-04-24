const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

// We want 4 questions per dimension (E, V, R, A, C, D) + 1 NONE = 25 questions total, OR
// We want to balance them to some other number. 
// Currently we have 27 total main questions:
// E:4, V:5, R:4, A:4, C:5, D:4, NONE:1
// Let's change one V to something else? Wait, we need them balanced for the radar chart to work properly.
// If we have 24 questions (4 per dim), we need to delete 2 more questions (one V, one C).
// Or we can just adjust the scoring logic to use averages instead of sums.
