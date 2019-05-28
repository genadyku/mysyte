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

export async function GetArticlesId(id) {
  let article;

  try {
       article = await Article.findById({ "_id": id}).exec();
  } catch (e) {
    throw e;
  }
   return article;
  }


