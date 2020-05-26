import { getCommentsByAskMeThread } from "../../../server/mongodb/actions/Comment";

// @route   GET api/comments/getCommentsByAskMeThread
// @desc    Get Comments for a Ask Me Thread
// @access  Public
const handler = (req, res) =>
  getCommentsByAskMeThread(req.body.threadId)
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
