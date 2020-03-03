import { login } from "../../server/mongodb/actions/User"

// @route   POST api/login
// @desc    Login Request
// @access  Public
const handler = (req, res) =>
  login(req.body.email, req.body.password)
    .then(token => {
      res.setHeader(
        "Set-Cookie",
        `token=${token}; Max-Age=604800; SameSite=Lax; Path=/`
      )

      res.status(200).json({
        success: true,
        payload: token,
      })
    })
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    )

export default handler
