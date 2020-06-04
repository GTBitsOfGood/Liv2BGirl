import { unfollowGroup } from "../../../server/mongodb/actions/Group";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   PUT api/group/unfollowGroup
// @desc    Unfollow Group Request
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(currUser => unfollowGroup(req.body.groupId, currUser._id))
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
