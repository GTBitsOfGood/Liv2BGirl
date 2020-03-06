import { unfollowGroup } from "../../../server/mongodb/actions/Group";

// @route   PUT api/group/unfollowGroup
// @desc    Unfollow Group Request
// @access  Public
const handler = (req, res) =>
  unfollowGroup(req.body.groupId, req.body.userId)
    .then(group =>
      res.status(200).json({
        success: true,
        payload: group
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message
      })
    );

export default handler;
