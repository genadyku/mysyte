import mongoose, {Schema} from "mongoose";


const articleSchema = Schema({
  title: String,
  text_hort: String,
});


export default mongoose.model("Article", articleSchema);
