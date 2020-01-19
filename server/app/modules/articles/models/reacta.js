import mongoose, { Schema } from "mongoose";


const ReactArticleSchema = Schema({
  title: String,
  titleShort: String,
  slug: String,
  textf: String,
});

export default mongoose.model("ReactArticle", ReactArticleSchema);
