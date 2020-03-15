import express from "express";

import * as LessonsController from "../modules/lessons/controllers/lessons";

const router = express.Router();

 router.get("/chapter", LessonsController.getChapters);
 router.get("/chapter/:slug", LessonsController.getChapter);
 router.get("/lessons", LessonsController.GetLessons);
 router.get("/lesson/:slug", LessonsController.GetLesson);
 router.post("/addchapter", LessonsController.addChapter);
 router.post("/addlesson", LessonsController.addLesson);
  router.get("/edit", LessonsController.GetLessonEdit);
 router.post("/lesson/:id/delete", LessonsController.deleteLesson);
 router.get("/lesson/:id/edit", LessonsController.GetLessonEditId);
router.post("/lesson/:id/update", LessonsController.UpdateLessonId);
export default router;
