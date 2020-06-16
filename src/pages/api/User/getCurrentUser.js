import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   GET api/user/getCurrentUser
// @desc    Get the signed-in users details
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then((payload) =>
      res.status(200).json({
        success: true,
        payload,
      })
    )
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
