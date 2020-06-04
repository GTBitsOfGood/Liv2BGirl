import {
  removeAskBookmark,
  verifyToken,
} from "../../../server/mongodb/actions/User";

// @route   POST api/user/removeAskBookmark
// @desc    Unbookmark an Ask Me thread
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => removeAskBookmark(curUser, req.body))
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
