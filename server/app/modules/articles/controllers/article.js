import * as ArticleService from "../services/ArticleService";
import { Article } from "../models";

export async function getArticles(req, res, next) {
let articles;
try {
  articles = await ArticleService.GetArticles();
} catch ({message}) {
return next({
 status: 500,
 message,
 });
}
 return res.json(articles);
}

export async function getArticleId(req, res, next) {
  let article;

  try {
    article = await ArticleService.GetArticlesId(req.params.slug);
  } catch ({message}) {
  return next({
   status: 500,
   message,
   });
  }
   return res.json(article);
  }

export async function addArticle(req, res, next) {
  const { title, titleShort, slug, textf } = req.body;

  let result;
  try {
    const foundArticle = await Article.findOne({ slug: slug });

    if (foundArticle ) {
      res.status(409);
      res.statusMessage = "Article is exist.";
      return res.send({ success: false, message: "Ошибка статья существует ." });
    }

    const newArticle = new Article({ title, titleShort, slug, textf });
    result = await newArticle.save();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  return res.json({
    message: "Article create",
    chapter: result
  });
}
