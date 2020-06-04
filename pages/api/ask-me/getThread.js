import { getThread } from "../../../server/mongodb/actions/AskMeThread";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   POST api/ask-me/getThread
// @desc    Get a thread
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => getThread(curUser, req.body))
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
