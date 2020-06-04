import { unfollowGroup } from "../../../server/mongodb/actions/Group";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   PUT api/user/unfollowGroup
// @desc    Unfollow Group Request
// @access  Public
const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => unfollowGroup(curUser, req.body.groupId))
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
