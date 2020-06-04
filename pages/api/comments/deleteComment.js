import { deleteComment } from "../../../server/mongodb/actions/Comment";
import { verifyTokenSecure } from "../../../server/mongodb/actions/User";

// @route   DELETE api/comments/deleteComment
// @desc    Delete Comment Request
// @access  Public
const handler = async (req, res) =>
  verifyTokenSecure(req, res)
    .then(currUser => deleteComment(currUser, req.body.commentId))
    .then(payload =>
      res.status(200).json({
        success: true,
        payload,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
