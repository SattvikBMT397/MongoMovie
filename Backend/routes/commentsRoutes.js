const express = require('express');
const commentsController = require('../controllers/commentsController');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.post('/add',authenticateJWT,commentsController.addComment);
router.get('/:imdbID',commentsController.getAllComments);

module.exports = router;