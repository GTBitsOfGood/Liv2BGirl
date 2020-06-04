import {
  getUserAskBookmarks,
  verifyToken,
} from "../../../server/mongodb/actions/User";

// @route   POST api/user/getUserAskBookmarks
// @desc    Gets a user's Ask Me bookmarks
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => getUserAskBookmarks(curUser._id))
    .then(bookmarks =>
      res.status(200).json({
        success: true,
        payload: bookmarks,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
