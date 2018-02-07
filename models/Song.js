const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please enter the song title.'
  },
  slug: String,
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: 'Artist',
    required: 'Please enter or select an artist.'
  },
  added: {
    type: Date,
    default: Date.now
  }
})

// define our indexes
songSchema.index({
  title: 'text'
})

songSchema.pre('save', async function (next) {
  if (!this.isModified('title')) {
    next();
    return;
  }

  this.slug = slug(this.title);

  // find other other songs that have the same slug
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');

  const songsWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (songsWithSlug.length) {
    this.slug = `${this.slug}-${songsWithSlug.length + 1}`;
  }

  next();
});

function autopopulate(next) {
  this.populate('artist');
  next();
}

songSchema.pre('find', autopopulate);
songSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Song', songSchema);

