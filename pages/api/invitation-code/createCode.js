import { createCode } from "../../../server/mongodb/actions/InvitationCode";

// @route   POST api/invitation-code/createCode
// @desc    Create Code Request
// @access  Public
const handler = (req, res) =>
  createCode(req.body.createdBy)
    .then(code =>
      res.status(200).json({
        success: true,
        payload: code,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
