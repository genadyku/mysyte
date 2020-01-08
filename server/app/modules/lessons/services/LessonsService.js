import { Chapter, Lesson } from "../models";

export async function GetChapters() {
  let chapters;

  try {
    chapters = await Chapter.find({}).exec();
  } catch (e) {
    throw e;
  }
  return chapters;
}

export async function GetLessons() {
  let lessons;

  try {
    lessons = await Chapter.find({})
      .populate("lessons")
      .exec();
  } catch (e) {
    throw e;
  }
  return lessons;
}

export async function GetLesson(slug) {
  let lesson;
  console.log("SLUG1=>:", slug);
  try {
    lesson = await Lesson.findOne({ "slug": slug }).exec();
    console.log("LESSON=>:", lesson);
  } catch (e) {
    throw e;
  }
  return lesson;
}
