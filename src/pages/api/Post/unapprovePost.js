import { unapprovePost } from "../../../../server/mongodb/actions/Post";
import { verifyToken } from "../../../../server/mongodb/actions/User";

// @route   POST api/Post/unapprovePost
// @desc    Unapprove Post Request
// @access  Public
const handler = async (req, res) =>
  verifyToken(req, res)
    .then((currentUser) => unapprovePost(currentUser, req.body))
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
