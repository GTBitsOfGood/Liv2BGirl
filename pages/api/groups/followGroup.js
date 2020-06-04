import { followGroup } from "../../../server/mongodb/actions/Group";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   PUT api/group/followGroup
// @desc    Follow Request
// @access  Public
const handler = async (req, res) =>
  verifyToken(req, res)
    .then(currUser => followGroup(req.body.groupId, currUser._id))
    .then(group =>
      res.status(200).json({
        success: true,
        payload: group,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
