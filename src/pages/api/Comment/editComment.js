import { editComment } from "../../../../server/mongodb/actions/Comment";
import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   POST api/comment/editComment
// @desc    Edits a Comment Request
// @access  Public
const handler = async (req, res) =>
  verifyTokenSecure(req, res)
    .then((currUser) => editComment(currUser, req.body))
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
