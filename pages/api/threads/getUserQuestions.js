import { getUserQuestions } from "../../../server/mongodb/actions/Thread";

// @route   POST api/threads/getUserQuestions
// @desc    Get a user's questions
// @access  Public
const handler = (req, res) => {
  getUserQuestions(req.body.posterId)
    .then(questions =>
      res.status(200).json({
        success: true,
        payload: questions,
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
