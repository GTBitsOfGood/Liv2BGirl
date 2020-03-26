import { deleteComment } from "../../../server/mongodb/actions/Comment";

// @route   DELETE api/comments/deleteComment
// @desc    Delete Comment Request
// @access  Public
const handler = (req, res) =>
  deleteComment(req.body.commentId)
    .then(comment =>
      res.status(200).json({
        success: true,
        payload: comment,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
