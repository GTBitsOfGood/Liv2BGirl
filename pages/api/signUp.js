import { signUp } from "../../server/mongodb/actions/User"

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
