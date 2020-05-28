import { searchGroups } from "../../../server/mongodb/actions/Group";

// @route   POST api/groups/searchGroups
// @desc    Search groups by text
// @access  Public
const handler = async (req, res) =>
  searchGroups(req.body)
    .then(groups =>
      res.status(200).json({
        success: true,
        payload: groups,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
