const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ['2P', 'AI'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  sentence: {
    type: String,
    required: true
  },
  discoveredLetters: [String],
  wrongLetters: [String],
  remainingLives: {
    type: Number,
    default: 6
  },
  isOver: {
    type: Boolean,
    default: false
  },
  isWin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);
