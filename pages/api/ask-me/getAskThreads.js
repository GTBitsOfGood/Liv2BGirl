import { getThreads } from "../../../server/mongodb/actions/AskMeThread";

// @route   POST api/ask-me/getAskThreads
// @desc    Get ask me threads
// @access  Public
const handler = (req, res) =>
  getThreads()
    .then(threads =>
      res.status(200).json({
        success: true,
        payload: threads,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
