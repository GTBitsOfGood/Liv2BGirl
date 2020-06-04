import { getGroupThreads } from "../../../server/mongodb/actions/Thread";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   POST api/threads/getGroupThreads
// @desc    Get a group's threads
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => getGroupThreads(curUser, req.body))
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
