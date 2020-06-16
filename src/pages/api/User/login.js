import { login } from "../../../../server/mongodb/actions/User";

// @route   POST api/user/login
// @desc    Login Request
// @access  Public
const handler = (req, res) =>
  login(req.body)
    .then((token) => {
      res.setHeader(
        "Set-Cookie",
        `token=${token}; Max-Age=604800; SameSite=Lax; Path=/`
      );

      return res.status(200).json({
        success: true,
        payload: token,
      });
    })
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
