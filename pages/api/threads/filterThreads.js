import { filterThreads } from "../../../server/mongodb/actions/Thread";

// @route   FILTER api/threads/filterThreads
// @desc    Filter Threads Request
// @access  Public
const handler = (req, res) =>
  filterThreads(
    req.body.groupId,
    req.body.option,
    req.body.lowerBound,
    req.body.upperBound
  )
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

export default handler;
