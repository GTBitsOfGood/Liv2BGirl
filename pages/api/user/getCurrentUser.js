import { verifyTokenSecure } from "../../../server/mongodb/actions/User";

const handler = (req, res) =>
  verifyTokenSecure(req, res)
    .then(token =>
      res.status(200).json({
        success: true,
        payload: token,
      })
    )
    .catch(error =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );

export default handler;
