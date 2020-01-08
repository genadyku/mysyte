import mongoose, { Schema } from "mongoose";

const ChapterSchema = Schema({
  chapter1: String,
  title: String,
  slug: String,
  textf: String,
  lessons: [
    { type: mongoose.Schema.Types.ObjectId, ref: "lesson" }]
});

export default mongoose.model("chapter", ChapterSchema);
