import { filterThreads } from "../../../server/mongodb/actions/AskMeThread";

// @route   GET api/ask-me/filterThreads
// @desc    GET Filtered threads Request
// @access  Public

const handler = (req, res) =>
  filterThreads(req.query.lowerBound, req.query.upperBound)
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
