import { createThread } from "../../server/mongodb/actions/Thread";

// @route   POST api/threads/createThread
// @desc    Create Thread Request
// @access  Public
const handler = (req, res) =>
  createThread(
    req.body.posterId,
    req.body.groupId,
    req.body.title,
    req.body.tags,
    req.body.content,
    req.body.postedAt
  )
    .then(thread =>
      res.status(200).json({
        success: true,
        payload: thread,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
