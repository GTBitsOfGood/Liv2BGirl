import { removeGroupBookmark } from "../../../server/mongodb/actions/User";

// @route   POST api/user/removeGroupBookmark
// @desc    Unbookmark a Group thread
// @access  Public
const handler = (req, res) =>
  removeGroupBookmark(req.body.userId, req.body.threadId)
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
