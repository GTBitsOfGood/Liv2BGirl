import { unreportComment } from "../../../../server/mongodb/actions/Comment";
import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   POST api/comment/unreportComment
// @desc    unreport Comment
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then((currUser) => unreportComment(currUser, req.body))
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
