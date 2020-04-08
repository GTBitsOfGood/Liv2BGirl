import { createGroup } from "../../../server/mongodb/actions/Group";

// @route   POST api/groups/creteGroup
// @desc    Create Group Request
// @access  Public
const handler = (req, res) =>
  createGroup(req.body.name, req.body.description, req.body.tags)
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
