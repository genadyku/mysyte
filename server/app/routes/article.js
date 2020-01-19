import express from "express";

import * as ArticleController from "../modules/articles/controllers/article";
import * as ArticleReactController from "../modules/articles/controllers/artreact";

const router = express.Router();

router.get("/articles", ArticleController.getArticles);
router.get("/article/:slug", ArticleController.getArticleId);
router.get("/artreact", ArticleReactController.getArticlesReact);
router.get("/artreact/:slug", ArticleReactController.getArticleIdReact);
router.post("/addarticle", ArticleController.addArticle);
router.post("/addreactarticle", ArticleReactController.addReactArticle);


export default router;
