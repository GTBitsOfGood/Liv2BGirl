import {
  removeGroupBookmark,
  verifyToken,
} from "../../../server/mongodb/actions/User";

// @route   POST api/user/removeGroupBookmark
// @desc    Unbookmark a Group thread
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => removeGroupBookmark(curUser, req.body.threadId))
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
