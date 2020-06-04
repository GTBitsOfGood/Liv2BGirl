import { unfollow, verifyToken } from "../../../server/mongodb/actions/User";

// @route   POST api/unfollow
// @desc    Unfollow Request
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => unfollow(curUser._id, req.body.toUnfollowId))
    .then(user =>
      res.status(200).json({
        success: true,
        payload: user,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
