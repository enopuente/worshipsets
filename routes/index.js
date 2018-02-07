const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const chordController = require('../controllers/chordController');
const videoController = require('../controllers/videoController');
const songController = require('../controllers/songController');
const setController = require('../controllers/setController');

// Catch errors here
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/add', songController.addSong);
router.post('/add',
  chordController.upload,
  catchErrors(artistController.addArtist),
  catchErrors(songController.createSong),
  catchErrors(chordController.addChord),
  catchErrors(videoController.addVideo)
);

module.exports = router;