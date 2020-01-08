import express from "express";

import * as LessonsController from "../modules/lessons/controllers/lessons";

const router = express.Router();

 router.get("/chapter", LessonsController.getChapters);
 router.get("/lessons", LessonsController.GetLessons);
  router.get("/lesson/:slug", LessonsController.GetLesson);
 router.post("/addchapter", LessonsController.addChapter);
 router.post("/addlesson", LessonsController.addLesson);


export default router;
