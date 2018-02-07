const mongoose = require('mongoose');
const Chord = mongoose.model('Chord');
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, './public/uploads/')
  },
  filename: function (req, file, next) {
    const extension = file.mimetype.split('/')[1];
    const chord = `${uuid.v4()}.${extension}`;
    next(null, chord);
  }
})

const multerOptions = {
  storage: storage,
  fileFilter(req, file, next) {
    const isPDF = file.mimetype.endsWith('/pdf');

    if (isPDF) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
}

exports.upload = multer(multerOptions).single('chord');

exports.addChord = async (req, res, next) => {

  // 1. check if song already has an existing chord with the same key
  const chordExists = await Chord.findOne({ song: req.body.song }).where('key').equals(req.body.key).exec();

  if (!chordExists) {
    req.body.file = req.file.filename;
    const chord = await (new Chord(req.body)).save();
    next();
  }

  // 2. chord already exists, redirect to page.
  req.flash('notice', `This chord already exist for ${req.body.title}!`)
  res.redirect(`/song/${req.body.slug}`);
}
