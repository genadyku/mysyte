import mongoose, {Schema} from "mongoose";


const ArticleSchema = Schema({
  title: String,
  titleShort: String,
  slug: String,
  textf: String,
});

export default mongoose.model("Article", ArticleSchema);
