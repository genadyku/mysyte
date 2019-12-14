import mongoose from "mongoose";
import bluebird from "bluebird";

mongoose.Promise = bluebird;


export default (mongoUri) => {
  if (!mongoUri) {
    throw Error("Mongo uri is undefined");
  }
  mongoose.set("useCreateIndex", true);


  return mongoose
    .connect(mongoUri, { useFindAndModify: false, useNewUrlParser: true })
    .then((mongodb) => {
      console.log("Mongo connected");

      return mongodb;
    });
};
