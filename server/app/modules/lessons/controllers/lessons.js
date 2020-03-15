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

export async function deleteLesson(req, res, next) {
  console.log("delete:", req.params.id);
  try {
    return await Lesson.findByIdAndRemove(req.params.id);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
}


export async function GetLessonEdit(req, res, next) {
  let lessons;
  const { _id, textf } = req.body;

  try {
    console.log("1-0", _id);
    console.log("1-0-1", textf );
    lessons = await LessonService.GetLessonsEdit();
  //  console.log("1-1", lessons);
  //  lesson = await Lesson.findOneAndUpdate({ _id: _id }, { $set: { textf: textf }}, { new: true } );
  //  console.log("edt", lessons);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
  return res.json(lessons);
}

export async function GetLessonEditId(req, res, next) {
  let lesson;
  console.log("Edit-1:", req.params.id);
  // const id = req.params.id;

  try {
   // const lesson = await Lesson.findOne({ _id: id });
    // lesson = await Lesson.findOneAndUpdate({ _id: _id }, { $set: { textf: textf }}, { new: true } );
    lesson = await LessonService.GetLessonId(req.params.id);

    console.log("edt-les", lesson);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
  return res.json(lesson);
}

export async function UpdateLessonId(req, res, next) {
  const { id, texthort, textf } = req.body;
  let lesson;

  try {
    lesson = await LessonService.GetLessonId(id);
    lesson = await Lesson.findOneAndUpdate({ _id: id }, { $set: { titleShort: texthort, textf: textf } }, {new: true});
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
  return res.json(lesson);
}
export async function getChapter(req, res, next) {
  let chapter;
  try {
    chapter = await LessonService.GetChapter(req.params.slug);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
  return res.json(chapter);
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
