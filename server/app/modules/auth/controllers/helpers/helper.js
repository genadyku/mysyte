import jwt from "jsonwebtoken";
import config from "config";


export const createToken = (user) => {
  let tokenData = {
    "_id": user._id,
    "email": user.email,
    "username": user.username,


  };
  console.log("SECRET", config.get("secret"));
  let token = jwt.sign(tokenData, config.get("secret"), {
    expiresIn: config.get("expirein"),
  });
  return token;
};
export const createRefreshToken = (data) => {
  console.log("SECRET", config.get("secret"));
  console.log("TOKEN", config.get("expirein"));
  return jwt.sign({type: "refresh", date: Date.now(), ...data}, config.get("secret"), { expiresIn: config.get("expirein") });
};

export const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  } else if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  return null;
};

export const generateToken=(length)=> {
  let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  let b = [];
  for (let i = 0; i < length; i++) {
    let j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
};

