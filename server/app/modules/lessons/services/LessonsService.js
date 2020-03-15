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

export async function GetLessonsEdit() {
  let lesson;

  try {
    lesson = await Lesson.find({}).exec();
  } catch (e) {
    throw e;
  }
  return lesson;
}

export async function GetChapter(slug) {
  let lessons;

  try {
    lessons = await Chapter.findOne({ "slug": slug})
      .populate("lessons")
      .exec();
  } catch (e) {
    throw e;
  }
  return lessons;
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

  try {
    lesson = await Lesson.findOne({ "slug": slug }).exec();
  } catch (e) {
    throw e;
  }
  return lesson;
}

export async function GetLessonId(id) {
  let lesson;

  try {
    lesson = await Lesson.findOne({ _id: id});
  } catch (e) {
    throw e;
  }
  return lesson;
}


