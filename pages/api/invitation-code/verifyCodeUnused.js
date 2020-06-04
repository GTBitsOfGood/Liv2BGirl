import { verifyCodeUnused } from "../../../server/mongodb/actions/InvitationCode";

// @route   POST api/invitation-code/verifyCodeUnused
// @desc    Verify Code Unused Request
// @access  Public
const handler = (req, res) =>
  verifyCodeUnused(req.body)
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
