import { login } from "../../server/mongodb/actions/User";

// @route   POST api/login
// @desc    Login Request
// @access  ???
const handler = (req, res) =>
  login(req.body.username, req.body.password)
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
