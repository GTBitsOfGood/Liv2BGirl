import {
  signUp,
  verifyTokenSecure,
} from "../../../server/mongodb/actions/User";

// @route   POST api/user/signUp
// @desc    SignUp Request
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then(curUser => signUp(curUser, req.body))
    .then(token => {
      res.setHeader(
        "Set-Cookie",
        `token=${token}; Max-Age=604800; SameSite=Lax; Path=/`
      );

      return res.status(200).json({
        success: true,
        payload: token,
      });
    })
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
