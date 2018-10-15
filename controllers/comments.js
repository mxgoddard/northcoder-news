const { Comment } = require('../models');

exports.deleteCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    return Comment.findByIdAndRemove(comment_id)
      .then(comment => {
        if (!comment) Promise.reject({ status: 404, message: 'No comment by that ID' })
        else res.status(200).send({ });
      })
      .catch(next);
  };

exports.patchCommentVotes = (req, res, next) => {
    const { comment_id } = req.params;
    let vote = req.query.vote;

    vote === 'up' ? vote=1 : vote = -1;
  
    return Comment.findByIdAndUpdate(
      comment_id,
      { $inc: { votes: vote } },
      { new: true }
    )
    .then(comment => {
        if (!comment) throw { status: 404, message: `Comment ${comment_id} not found.` };
        res.status(200).send({ comment });
    })
    .catch(next);
};