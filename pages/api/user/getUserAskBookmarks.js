import { getUserAskBookmarks } from "../../../server/mongodb/actions/User";

// @route   POST api/user/getUserAskBookmarks
// @desc    Gets a user's Ask Me bookmarks
// @access  Public
const handler = (req, res) =>
  getUserAskBookmarks(req.body.userId)
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
