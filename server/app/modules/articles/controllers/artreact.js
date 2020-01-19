import * as ArtReactService from "../services/ArtReactService";
import { ReactArticle } from "../models";

export async function getArticlesReact(req, res, next) {
  let articles;
  try {
    articles = await ArtReactService.GetArticlesReact();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }
  return res.json(articles);
}

export async function getArticleIdReact(req, res, next) {
  let article;
  try {
    article = await ArtReactService.GetArticlesIdReact(req.params.slug);
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }
  return res.json(article);
}

export async function addReactArticle(req, res, next) {
  const { title, titleShort, slug, textf } = req.body;

  let result;
  try {
    const foundArticle = await ReactArticle.findOne({ slug: slug });

    if (foundArticle) {
      res.status(409);
      res.statusMessage = "Article React is exist.";
      return res.send({ success: false, message: "Ошибка статья React существует ." });
    }

    const newArticle = new ReactArticle({ title, titleShort, slug, textf });
    result = await newArticle.save();
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  return res.json({
    message: "Article React create",
    chapter: result
  });
}


