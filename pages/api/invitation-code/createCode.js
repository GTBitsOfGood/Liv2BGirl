import { createCode } from "../../../server/mongodb/actions/InvitationCode";
import { verifyTokenSecure } from "../../../server/mongodb/actions/User";

// @route   GET api/invitation-code/createCode
// @desc    Create Code Request
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then(currUser => createCode(currUser))
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
