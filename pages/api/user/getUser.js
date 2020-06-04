import { getUser, verifyToken } from "../../../server/mongodb/actions/User";

const handler = (req, res) =>
  verifyToken(req, res)
    .then(curUser => getUser(curUser, req.body.userId))
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
