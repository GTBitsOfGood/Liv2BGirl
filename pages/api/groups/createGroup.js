import { createGroup } from "../../../server/mongodb/actions/Group";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   POST api/groups/createGroup
// @desc    Create Group Request
// @access  Public
const handler = async (req, res) =>
  verifyToken(req, res)
    .then(currUser =>
      createGroup(
        currUser._id,
        req.body.name,
        req.body.description,
        req.body.category,
        req.body.admin
      )
    )
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
