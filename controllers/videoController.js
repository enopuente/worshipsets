const mongoose = require('mongoose');
const Video = mongoose.model('Video');

exports.addVideo = async (req, res) => {
  if (req.body.video) {
    const video = await (new Video(req.body)).save();
  }

  req.flash('success', `Successfully added ${req.body.title}!`)
  res.redirect(`/song/${req.body.slug}`);
}