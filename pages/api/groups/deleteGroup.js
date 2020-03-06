import { deleteGroup } from "../../../server/mongodb/actions/Group";

// @route   DELETE api/groups/deleteGroup
// @desc    Delte Group Request
// @access  Public
const handler = (req, res) =>
  deleteGroup(req.body.groupId)
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
