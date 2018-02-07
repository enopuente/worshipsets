const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const videoSchema = new mongoose.Schema({
  video: String,
  song: {
    type: mongoose.Schema.ObjectId,
    ref: 'Song'
  }
})

module.exports = mongoose.model('Video', videoSchema);