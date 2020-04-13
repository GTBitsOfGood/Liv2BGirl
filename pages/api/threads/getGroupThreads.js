import { getGroupThreads } from "../../../server/mongodb/actions/Thread";

// @route   POST api/threads/getGroupThreads
// @desc    Get a group's threads
// @access  Public
const handler = (req, res) => {
  getGroupThreads(req.body.groupId)
    .then(threads =>
      res.status(200).json({
        success: true,
        payload: threads,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );
};

export default handler;
