import { createGroup } from "../../../server/mongodb/actions/Group";
import { verifyToken } from "../../../server/mongodb/actions/User";

// @route   POST api/groups/createGroup
// @desc    Create Group Request
// @access  Public
const handler = async (req, res) => {
  const currUser = await verifyToken(req, res);

  return createGroup(
    currUser.id,
    req.body.name,
    req.body.description,
    req.body.tags,
    req.body.admin
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
};

export default handler;
