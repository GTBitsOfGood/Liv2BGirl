import { getReportedComments } from "../../../../server/mongodb/actions/Comment";
import { verifyTokenSecure } from "../../../../server/mongodb/actions/User";

// @route   GET api/comments/getReportedComments
// @desc    Get reported comments
// @access  Public
const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then((curUser) => getReportedComments(curUser))
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
