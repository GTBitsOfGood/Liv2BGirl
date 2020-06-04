import { deleteThread } from "../../../server/mongodb/actions/AskMeThread";
import { verifyTokenSecure } from "../../../server/mongodb/actions/User";

// @route   DELETE api/ask-me/deleteThread
// @desc    Delete Thread Request
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then(curUser => deleteThread(curUser, req.body.threadId))
    .then(thread =>
      res.status(200).json({
        success: true,
        payload: thread,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
