import { filterThreads } from "../../../server/mongodb/actions/AskMeThread";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   POST api/ask-me/filterThreads
// @desc    Filtered threads Request
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser =>
      filterThreads(curUser, req.body.lowerBound, req.query.upperBound)
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
