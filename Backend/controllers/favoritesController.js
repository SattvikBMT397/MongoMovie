const Favorite = require('../model/favoritesModel');
const { favoriteSchema } = require('../validation/validation');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, sendSuccess, sendError } = require('../utils/statusCode');

const addFavorite = async (req, res) => {
  const { imdbID } = req.body;
  const id = req.user.id;
  const validation = favoriteSchema.safeParse({ imdbID });
  if (!validation.success) {
    return sendError(res, validation.error.issues, BAD_REQUEST);
  }

  try {
    const newFavorite = new Favorite({ user_id: id, imdbID });
    await newFavorite.save();
    sendSuccess(res, 'Favorite added');
  } catch (error) {
    console.error('Error adding favorite:', error);
    sendError(res, 'Error adding favorite', INTERNAL_SERVER_ERROR);
  }
};

const getFavorites = async (req, res) => {
  const userId = req.params.user_id;
  try {
    const favorites = await Favorite.find({ user_id: userId });
    console.log(favorites);
    sendSuccess(res, 'Favorites fetched successfully', favorites);
  } catch (error) {
    console.error('Error getting favorites:', error);
    sendError(res, 'Error getting favorites', INTERNAL_SERVER_ERROR);
  }
};

const removeFavorite = async (req, res) => {
  const { imdbID } = req.body;
  const user_id = req.user.id;
 console.log("ggg", user_id)
  try {
    const favorite = await Favorite.findOne({ user_id, imdbID });
    console.log(favorite);

    if (!favorite) {
      return sendError(res, 'Favorite not found', 404);
    }

    // Remove the favorite entry
    await Favorite.deleteOne({ user_id, imdbID });

    sendSuccess(res, 'Favorite removed');
  } catch (error) {
    console.error('Error removing favorite:', error);
    sendError(res, 'Error removing favorite', 500);
  }
};


module.exports = { addFavorite, getFavorites, removeFavorite };
