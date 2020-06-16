import { searchGroups } from "../../../../server/mongodb/actions/Group";
import { verifyToken } from "../../../../server/mongodb/actions/User";

// @route   POST api/group/searchGroups
// @desc    Search group by text
// @access  Public
const handler = async (req, res) =>
  verifyToken(req, res)
    .then((curUser) => searchGroups(curUser, req.body))
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
