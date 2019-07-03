import { Artreact } from "../models";


export async function GetArticlesReact() {
  let articles;

  try {
    articles = await Artreact.find({}).exec();
  } catch (e) {
    throw e;
  }
  return articles;
}

export async function GetArticlesIdReact(id) {
  let article;

  try {
    article = await Artreact.findById({ "_id": id }).exec();
  } catch (e) {
    throw e;
  }
  return article;
}


