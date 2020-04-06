import mongoose from "mongoose";
import urls from "../../utils/urls";

export default async () => {
  if (mongoose.connections[0].readyState) return;
  console.log("mongoose connecting");

  await mongoose
    .connect(urls.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: urls.dbName,
    })
    .catch(e => {
      console.error("Error connecting to database.");

      throw e;
    });
};
