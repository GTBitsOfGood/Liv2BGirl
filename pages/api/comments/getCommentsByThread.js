import { getCommentsByThread } from "../../../server/mongodb/actions/Comment";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   GET api/comments/getCommentsByThread
// @desc    Get Comment for a Thread
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => getCommentsByThread(curUser, req.body.threadId))
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
