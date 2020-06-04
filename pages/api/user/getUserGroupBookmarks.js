import {
  getUserGroupBookmarks,
  verifyToken,
} from "../../../server/mongodb/actions/User";

// @route   POST api/user/getUserGroupBookmarks
// @desc    Gets a user's Group bookmarks
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => getUserGroupBookmarks(curUser._id))
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
