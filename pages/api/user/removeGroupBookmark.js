import {
  removeGroupBookmark,
  verifyToken,
} from "../../../server/mongodb/actions/User";

// @route   POST api/user/removeGroupBookmark
// @desc    Unbookmark a Group thread
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => removeGroupBookmark(curUser._id, req.body.threadId))
    .then(thread =>
      res.status(200).json({
        success: true,
        payload: thread,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
