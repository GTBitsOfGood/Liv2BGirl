import { searchThreads } from "../../../server/mongodb/actions/Thread";

// @route   POST api/threads/searchThreads
// @desc    POST Search threads Request
// @access  Public

const handler = (req, res) =>
  searchThreads(req.body.terms, req.body.groupId)
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
