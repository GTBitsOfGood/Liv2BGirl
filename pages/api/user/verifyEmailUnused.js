import { verifyEmailUnused } from "../../../server/mongodb/actions/User";

// @route   POST api/user/verifyEmailUnused
// @desc    Verify Email Unused Request
// @access  Public
const handler = (req, res) =>
  verifyEmailUnused(req.body)
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
