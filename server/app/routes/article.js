import express from "express";

import * as ArticleController from "../modules/articles/controllers/article";
import * as ArticleReactController from "../modules/articles/controllers/artreact";

const router = express.Router();

router.get("/articles", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticleId);
router.get("/artreact", ArticleReactController.getArticlesReact);
router.get("/artreact/:id", ArticleReactController.getArticleIdReact);

export default router;
