import { unfollow } from "../../server/mongodb/actions/User";

// @route   POST api/unfollow
// @desc    Unfollow Request
// @access  Public
const handler = (req, res) =>
  unfollow(req.body.userId, req.body.toUnfollowId)
    .then(user =>
      res.status(200).json({
        success: true,
        payload: user
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message
      })
    );

export default handler;
