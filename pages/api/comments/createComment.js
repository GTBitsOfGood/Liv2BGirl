import { createComment } from "../../../server/mongodb/actions/Comment";

// @route   POST api/comments/createComment
// @desc    Create Group Request
// @access  Public
const handler = (req, res) =>
  createComment(req.body.poster, req.body.parentId, req.body.content)
    .then(comment =>
      res.status(200).json({
        success: true,
        payload: comment,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
