import { getGroup } from "../../../server/mongodb/actions/Group";

const handler = (req, res) =>
  getGroup(req.body.groupId)
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
