import mongoose, { Schema } from "mongoose";


const artreactSchema = Schema({
  title: String,
  texthort: String,
  text: String
});


export default mongoose.model("Artreact", artreactSchema);
