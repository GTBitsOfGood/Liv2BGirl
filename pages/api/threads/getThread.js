import { getThread } from "../../../server/mongodb/actions/Thread";

// @route   POST api/threads/getThread
// @desc    Get a thread
// @access  Public
const handler = (req, res) =>
  getThread(req.body.threadId)
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
