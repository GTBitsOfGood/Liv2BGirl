import { getCommentsByThread } from "../../../../server/mongodb/actions/Comment";
import { verifyToken } from "../../../../server/mongodb/actions/User";

// @route   POST api/comment/getCommentsByThread
// @desc    Get Comments for a Thread
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then((curUser) => getCommentsByThread(curUser, req.body))
    .then((payload) =>
      res.status(200).json({
        success: true,
        payload,
      })
    )
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
