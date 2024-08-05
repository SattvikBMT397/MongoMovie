const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imdbID: { type: String, required: true },
});

const Favorite = mongoose.model('Favorite', favoritesSchema);

module.exports = Favorite;
