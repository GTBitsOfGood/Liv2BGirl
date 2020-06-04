import {
  addGroupBookmark,
  verifyToken,
} from "../../../server/mongodb/actions/User";

// @route   POST api/user/addGroupBookmark
// @desc    Bookmark a Group thread
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => addGroupBookmark(curUser, req.body.threadId))
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
