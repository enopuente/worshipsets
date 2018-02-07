const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter a name!'
  }
})

// define our indexes
artistSchema.index({
  name: 'text'
})

module.exports = mongoose.model('Artist', artistSchema);