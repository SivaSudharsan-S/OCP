const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  result: { type: String, enum: ['Accepted', 'Wrong Answer', 'Error'] },
  createdAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;
