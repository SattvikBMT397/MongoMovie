const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const authenticateJWT = require('../middleware/auth');
const router = express.Router();

router.post('/add', authenticateJWT,favoritesController.addFavorite);
router.get('/:user_id', favoritesController.getFavorites);
router.delete('/delete', authenticateJWT,favoritesController.removeFavorite);

module.exports = router;
    