import { searchThreads } from "../../../server/mongodb/actions/AskMeThread";

// @route   POST api/ask-me/searchThreads
// @desc    POST Search threads Request
// @access  Public

const handler = (req, res) =>
  searchThreads(req.body.terms)
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
