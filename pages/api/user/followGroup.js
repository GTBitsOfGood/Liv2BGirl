import { followGroup, verifyToken } from "../../../server/mongodb/actions/User";

// @route   POST api/user/followGroup
// @desc    Follow Request
// @access  Public
const handler = async (req, res) =>
  verifyToken(req, res)
    .then(curUser => followGroup(curUser, req.body))
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
