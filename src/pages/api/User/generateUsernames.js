import { generateUsernames } from "../../../../server/mongodb/actions/User";

// @route   POST api/user/generateUsernames
// @desc    Generate Usernames Request
// @access  Public
const handler = (req, res) =>
  generateUsernames(req.body)
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
