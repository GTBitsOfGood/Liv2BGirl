import { getReportedThreads } from "../../../../server/mongodb/actions/AskMeThread";
import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   GET api/ask-me/getAskThreads
// @desc    Get reported askme threads
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then((curUser) => getReportedThreads(curUser))
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
