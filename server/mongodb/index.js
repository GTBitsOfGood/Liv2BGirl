import mongoose from "mongoose";
import urls from "../../utils/urls";

export default async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(urls.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: urls.dbName,
    })
    .catch((e) => {
      console.error("Error connecting to database.");

      throw e;
    });

  require("./models/AskMeThread");
  require("./models/Comment");
  require("./models/Group");
  require("./models/GroupCategory");
  require("./models/InvitationCode");
  require("./models/Report");
  require("./models/User");
};
