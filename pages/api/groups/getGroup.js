import { getGroup } from "../../../server/mongodb/actions/Group";
import { verifyToken } from "../../../server/mongodb/actions/User";

const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => getGroup(curUser, req.body))
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
