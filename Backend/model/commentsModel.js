const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imdbID: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true }
});
 const commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel;
