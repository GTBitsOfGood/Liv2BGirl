import { removeAskBookmark } from "../../../server/mongodb/actions/User";

// @route   POST api/user/removeAskBookmark
// @desc    Unbookmark an Ask Me thread
// @access  Public
const handler = (req, res) =>
  removeAskBookmark(req.body.userId, req.body.threadId)
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
