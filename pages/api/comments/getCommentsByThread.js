import { getCommentsByThread } from "../../../server/mongodb/actions/Comment";

// @route   GET api/comments/getCommentsByThread
// @desc    Get Comments for a Thread
// @access  Public
const handler = (req, res) =>
  getCommentsByThread(req.query.threadId)
    .then(comments =>
      res.status(200).json({
        success: true,
        payload: comments,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
