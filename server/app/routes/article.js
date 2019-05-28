import express from "express";

import * as ArticleController from "../modules/articles/controllers/article";

const router = express.Router();


router.get("/articles", ArticleController.getArticles );
router.get("/article/:id", ArticleController.getArticleId );

export default router;
