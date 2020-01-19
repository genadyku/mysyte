import { ReactArticle } from "../models";


export async function GetArticlesReact() {
  let articles;

  try {
    articles = await ReactArticle.find({}).exec();
  } catch (e) {
    throw e;
  }
  return articles;
}

export async function GetArticlesIdReact(slug) {
  let article;

  try {
    article = await ReactArticle.findOne({ "slug": slug }).exec();
  } catch (e) {
    throw e;
  }
  return article;
}


