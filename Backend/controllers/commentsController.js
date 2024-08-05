const commentModel = require('../model/commentsModel');

const addComment = async (req, res) => {
  const {  imdbID, comment, rating } = req.body;
  const user_id = req.user.id;
  try {
    const newComment = new commentModel({ user_id, imdbID, comment, rating });
    await newComment.save();
    res.status(201).send('Comment added successfully');
  } catch (error) {
    res.status(400).send('Error adding comment');
  }
};

const getAllComments = async (req, res) => {
  const { imdbID } = req.params;
  try {
    const comments = await commentModel.find({ imdbID }).populate('user_id', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).send('Error fetching comments');
  }
};

module.exports = { addComment, getAllComments };
