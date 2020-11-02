import { getApprovedPosts } from "../../../../server/mongodb/actions/Post";
import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   POST api/groupThread/getGroupThreads
// @desc    Get a group's groupThread
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then(() => getApprovedPosts())
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
