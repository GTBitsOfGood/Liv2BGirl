import { filterThreads } from "../../../server/mongodb/actions/Thread";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   GET api/threads/filterThreads
// @desc    GET Filtered threads Request
// @access  Public

const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser =>
      filterThreads(
        curUser,
        req.query.groupId,
        req.query.lowerBound,
        req.query.upperBound
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
