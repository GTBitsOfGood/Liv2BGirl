import { signUp } from "../../server/mongodb/actions/User";

// @route   POST api/signUp
// @desc    SignUp Request
// @access  Public

const handler = (req, res) =>
  signUp(
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.role,
    req.body.name
  )
    .then(user =>
      res.status(200).json({
        success: true,
        payload: user
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message
      })
    );

export default handler;
