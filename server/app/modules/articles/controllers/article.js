import * as ArticleService from "../services/ArticleService";

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
    article = await ArticleService.GetArticlesId(req.params.id);
  } catch ({message}) {
  return next({
   status: 500,
   message,
   });
  }
   return res.json(article);
  }

