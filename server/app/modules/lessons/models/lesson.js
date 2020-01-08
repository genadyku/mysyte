import mongoose, { Schema } from "mongoose";

const LessonSchema = Schema({
      chapterId: { type: mongoose.Schema.ObjectId, ref: "chapter" },
      num: String,
      slug: String,
      title: String,
      titleShort: String,
      textf: String,

});

export default mongoose.model("lesson", LessonSchema);
