import { follow } from "../../../server/mongodb/actions/User";

// @route   POST api/follow
// @desc    Follow Request
// @access  Public
const handler = (req, res) =>
  follow(req.body.userId, req.body.toFollowId)
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