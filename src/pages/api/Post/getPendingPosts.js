import { getPendingPosts } from "../../../../server/mongodb/actions/Post";
import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   GET api/post/getPendingdPosts
// @desc    Get pending posts
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then((currUser) => getPendingPosts(currUser))
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