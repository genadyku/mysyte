import {Article} from "../models";


export async function GetArticles() {
let articles;

try {
  articles = await Article.find({}).exec();
} catch (e) {
  throw e;
}
 return articles;
}

export async function GetArticlesId(slug) {
  let article;

  try {
    article = await Article.findOne({ "slug": slug}).exec();
  } catch (e) {
    throw e;
  }
   return article;
  }


