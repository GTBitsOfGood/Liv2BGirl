import { deleteThread } from "../../../../server/mongodb/actions/GroupThread";
import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   POST api/groupThread/deleteThread
// @desc    Delete Thread Request
// @access  Public
const handler = async (req, res) =>
  verifyTokenSecure(req, res)
    .then((currUser) => deleteThread(currUser, req.body))
    .then((payload) =>
      res.status(200).json({
        success: true,
        payload,
      })
    )
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
