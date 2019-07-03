import * as ArtReactService from "../services/ArtReactService";

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
    article = await ArtReactService.GetArticlesIdReact(req.params.id);
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }
  return res.json(article);
}

