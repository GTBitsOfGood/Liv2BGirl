import { deleteThread } from "../../../server/mongodb/actions/Thread";
import { verifyTokenSecure } from "../../../server/mongodb/actions/User";

// @route   DELETE api/threads/deleteThread
// @desc    Delete Thread Request
// @access  Public
const handler = async (req, res) =>
  verifyTokenSecure(req, res)
    .then(currUser => deleteThread(currUser, req.body.threadId))
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
