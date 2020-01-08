import * as LessonService from "../services/LessonsService";

import { Chapter, Lesson } from "../models";


export async function getChapters(req, res, next) {
  let chapters;
  try {
    chapters = await LessonService.GetChapters();
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
  return res.json(chapters);
}

export async function GetLessons(req, res, next) {
  let lessons;
  try {
     lessons = await LessonService.GetLessons();
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
  return res.json(lessons);
}
export async function GetLesson(req, res, next) {
  let lesson;
  try {
    lesson = await LessonService.GetLesson(req.params.slug);
    console.log("LESSON", lesson);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
  return res.json(lesson);
}

export async function addChapter(req, res, next) {
  const { chapter1, title, slug, textf } = req.body;

  let result;
  try {
        const foundChapter = await Chapter.findOne({ slug: slug });

        if (foundChapter) {
          res.status(409);
          res.statusMessage = "Chapter is exist.";
          return res.send({ success: false, message: "Ошибка раздел существует ." });
        }

        const newChapter = new Chapter({ chapter1, title, slug, textf});
         result = await newChapter.save();
      } catch ({ message }) {
        return next({
          status: 500,
          message,
        });
      }

        return res.json({
          message: "Chapter create",
          chapter: result
        });
}
/*
export async function addLesson(req, res, next) {
  const { chapterId, num, slug, title, titleShort, textf } = req.body;

  let result;
  try {
    const foundLesson = await Lesson.findOne({ slug: slug });

    if (foundLesson) {
      res.status(409);
      res.statusMessage = "Lesson is exist.";
      return res.send({ success: false, message: "Ошибка раздел существует ." });
    }

    const newLesson = new Lesson({ chapterId, num, slug, title, titleShort, textf});
    result = await newLesson.save();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  return res.json({
    message: "Lesson create",
    chapter: result
  });
}
*/
export async function addLesson(req, res, next) {
  const { chapterId, num, slug, title, titleShort, textf } = req.body;

  let result;
  let chapter;
  try {
    const foundLesson = await Lesson.findOne({ slug: slug });

    if (foundLesson) {
      res.status(409);
      res.statusMessage = "Lesson is exist.";
      return res.send({ success: false, message: "Ошибка раздел существует ." });
    }

    const newLesson = new Lesson({ chapterId, num, slug, title, titleShort, textf });
    result = await newLesson.save();

    chapter = await Chapter.findById({ "_id": chapterId }).exec();
    console.log("1", chapter);
    chapter.lessons.push(newLesson);

    console.log("2", chapter);
    await chapter.save();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  return res.json({
    message: "Lesson create",
    chapter: result
  });
}
