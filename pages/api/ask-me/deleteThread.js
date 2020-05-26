import { deleteThread } from "../../../server/mongodb/actions/AskMeThread";

// @route   DELETE api/ask-me/deleteThread
// @desc    Delete Thread Request
// @access  Public
const handler = (req, res) =>
  deleteThread(req.body.threadId)
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
