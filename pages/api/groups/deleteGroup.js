import { deleteGroup } from "../../../server/mongodb/actions/Group";
import { verifyTokenSecure } from "../../../server/mongodb/actions/User";

// @route   POST api/groups/deleteGroup
// @desc    Delete Group Request
// @access  Public
const handler = async (req, res) =>
  verifyTokenSecure(req, res)
    .then(currUser => deleteGroup(currUser, req.body.groupId))
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
