import { searchThreads } from "../../../server/mongodb/actions/Thread";

// @route   GET api/threads/searchThreads
// @desc    GET Search threads Request
// @access  Public

const handler = (req, res) =>
  searchThreads(req.query.groupId, req.query.terms)
    .then(token => {
      res.status(200).json({
        success: true,
        payload: token,
      });
    })
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
