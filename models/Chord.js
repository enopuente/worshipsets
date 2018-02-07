const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const chordSchema = new mongoose.Schema({
  key: String,
  file: String,
  song: {
    type: mongoose.Schema.ObjectId,
    ref: 'Song'
  }
})

module.exports = mongoose.model('Chord', chordSchema);