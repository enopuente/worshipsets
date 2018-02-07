const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const chordController = require('../controllers/chordController');
const videoController = require('../controllers/videoController');
const songController = require('../controllers/songController');
const setController = require('../controllers/setController');

// Catch errors here
const { catchErrors } = require('../handlers/errorHandlers');

// add song
router.get('/add', songController.addSong);
router.post('/add',
  chordController.upload,
  catchErrors(artistController.addArtist),
  catchErrors(songController.createSong),
  catchErrors(chordController.addChord),
  catchErrors(videoController.addVideo)
);

// get song
router.get('/song/:slug', catchErrors(songController.getSongBySlug));

// list songs
router.get('/songs', catchErrors(songController.getSongs));

module.exports = router;