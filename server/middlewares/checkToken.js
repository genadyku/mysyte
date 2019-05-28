import jwt from "jsonwebtoken";
import { SECRET } from "../app/config";

export default async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return next({
      status: 403,
      message: "Forbided MY ,No token"
    });
  }
  let tokenObj;
  try {
    tokenObj = jwt.verify(token, SECRET);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    });
  }
  req.token = tokenObj;
  next();
};
