var express = require('express');
var router = express.Router();
const { version, author, license } = require('../package.json');

router.get('/status', function(req, res) {
  res.json({
    author: author,
    contact: "espeebne@proton.me",
    version: version,
    license: license,
    status: "OK"
  });
});

const gamesRouter = require('./games');
router.use('/games', gamesRouter);

module.exports = router;
