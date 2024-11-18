const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  testCases: [
    {
      input: String,
      output: String,
    }
  ],
});

const Problem = mongoose.model('Problem', ProblemSchema);
module.exports = Problem;
