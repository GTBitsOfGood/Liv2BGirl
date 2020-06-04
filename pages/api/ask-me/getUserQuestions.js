import { getUserQuestions } from "../../../server/mongodb/actions/AskMeThread";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   GET api/ask-me/getUserQuestions
// @desc    Get a user's questions
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => getUserQuestions(curUser))
    .then(payload =>
      res.status(200).json({
        success: true,
        payload,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
