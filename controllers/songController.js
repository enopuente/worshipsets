const mongoose = require('mongoose');
const Song = mongoose.model('Song');
const Artist = mongoose.model('Artist');
const Chord = mongoose.model('Chord');
const capitalizeWords = require('../handlers/capitalizeWords');

exports.addSong = (req, res) => {
  res.render('editSong', { title: 'Add Song' });
}

// create song from post
exports.createSong = async (req, res, next) => {

  req.body.title = capitalizeWords(req.body.title).trim();

  // 1. check if the song title already exists
  const songExists = await Song.findOne({ title: req.body.title });
  
  
  // 2. if exists, check if the artist matches
  if (songExists) {
    const artist = await Artist.findOne({ _id: songExists.artist._id });

    // 3. if title and and artist already exists, skip it!
    if (artist._id.equals(req.body.artist)) {
      req.body.slug = songExists.slug;
      req.body.song = songExists._id;
      next();
      return;
    }
  }

  // 4. otherwise, save the new song
  const song = await (new Song(req.body)).save();

  // store slug and id to request body so chord and video can pick it up
  req.body.slug = song.slug;
  req.body.song = song._id;

  next();
}

// list all songs
exports.getSongs = async (req, res) => {
  const songs = await Song.find().sort({ artist: 'desc' });
  res.render('songs', { title: 'Songs', songs });
}

// get song by slug
exports.getSongBySlug = async (req, res) => {
  let chords = [];
  const song = await Song.findOne({ slug: req.params.slug });
  const template = (req.query.action === 'edit') ? 'edit' : 'view';

  if (template === 'view') {
    chords = await Chord.find({ song: song._id});
  }
  const title = capitalizeWords(template);

  res.render(`${template}Song`, { title: `${title} Song`, song, chords });
}