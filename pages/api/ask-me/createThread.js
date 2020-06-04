import { createThread } from "../../../server/mongodb/actions/AskMeThread";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   POST api/ask-me/createThread
// @desc    Create Thread Request
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser =>
      createThread(
        curUser,
        req.body.title,
        req.body.content,
        req.body.visibility
      )
    )
    .then(payload =>
      res.status(200).json({
        success: true,
        payload,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
