import { reportThread } from "../../../../server/mongodb/actions/AskMeThread";
import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   POST api/ask-me/unreportThread
// @desc    Unreport Thread Request
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then((curUser) => reportThread(curUser, req.body))
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
