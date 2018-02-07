const mongoose = require('mongoose');
const Artist = mongoose.model('Artist');
const capitalizeWords = require('../handlers/capitalizeWords');

exports.addArtist = async (req, res, next) => {
  // find artists that have the same name
  const artistRegExp = new RegExp(`^(${req.body.artist})$`, 'i');
  const artistExist = await Artist.findOne({ name: artistRegExp });

  if (!artistExist) {
    const name = capitalizeWords(req.body.artist);
    const artist = await (new Artist({name})).save();
    req.body.artist = artist._id;
  }
  else {
    req.body.artist = artistExist._id;
  }

  console.log('Artist ID: ' + req.body.artist);

  // call next middleware
  next();
}