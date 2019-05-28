import jwt from "jsonwebtoken";
import config from "config";

import { User } from "../../users";
import { SECRET } from "../../../config";
import { createRefreshToken, createToken, getToken } from "./helpers/helper";
import { sendVerificationEmail } from "./helpers/mail";

export const signup = async (req, res, next) => {
  const { username, email, firstName, lastName, password } = req.body;
  const foundUser = await User.findOne(
    { email: email, isConfirm: true },
    "email"
  );
  if (foundUser) {
    res.status(409);
    res.statusMessage = "Register failed failed.Email exist.";
    return res.send({ success: false, message: "Пользователь1 существует ." });
  } else {
    const foundUserC = await User.findOne({ email: email, isConfirm: false });
    if (foundUserC) {
      if (new Date() > foundUserC.confirmAccountTokenExpires) {
        await foundUserC.remove();
      }
    }

    const newUser = new User({
      username,
      email,
      firstName,
      lastName,
      password,
      confirmAccountTokenExpires: Date.now() + config.get("tokenExpires")
    });
    newUser.refreshToken = createRefreshToken();
    newUser.isConfirm = false;
    const result = await newUser.save();
    console.log("USER SAVE :");

    try {
      await sendVerificationEmail(
        config.get("from"),
        email,
        username,
        result.refreshToken
      );
      res.json({
        message: "Welcome",
        token: createToken(result),
        refreshToken: result.refreshToken,
        name: result.name
      });
    } catch (err) {
      console.log(err);
      res.json({ message: err });
    }
  }
};

export const signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401);

      res.statusMessage = "Authentication failed. User not found.";
      return res.send({
        success: false,
        message: "Ошибка аутентификации. Пользователь или пароль неверны."
      });
    }

    if (!user.isConfirm) {
      res.status(401);

      res.statusMessage = "Authentication failed. User not found.";
      return res.send({
        success: false,
        message: "Ошибка аутентификации 1. Пользователь или пароль неверны."
      });
    }

    if (!user.comparePasswords(password)) {
      console.log("PASSWORD ERROR:");
      res.status(401);
      res.statusMessage = "Authentication failed. User not found."; // eslint-disable-line no-param-reassign
      return res.send({
        success: false,
        message: "Ошибка аутентификации. Пользователь или пароль неверны."
      });
    } else {
      user.refreshToken = createRefreshToken({ email: email });
      user.save((err, result) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json({
            message: "Welcome",
            token: createToken(result),
            refreshToken: result.refreshToken,
            name: result.name
          });
        }
      });
    }
  });
};

export const verifymail = (req, res, next) => {
  const { token } = req.body;
  let refreshToken = token;

  return User.findOne(
    {
      refreshToken: refreshToken,
      confirmAccountTokenExpires: { $gt: Date.now() }
    },
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          success: false,
          token: refreshToken,
          message: "Токен протух "
        });
      }

      User.findOneAndUpdate(
        { _id: user._id },
        { $set: { isConfirm: true } },
        function(err, doc) {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          console.log("SUCCES  confirm  SAVE");

          res.json({
            message: "Welcome",
            token: createToken(doc),
            refreshToken: refreshToken,
            success: true
          });
        }
      );
    }
  );
};

export const resendmail = (req, res, next) => {
  const { token } = req.body;
  let refreshToken = token;

  let tokenObj;
  try {
    tokenObj = jwt.verify(refreshToken, "gente");
  } catch ({ message }) {
    console.log(" SEARCH TOKEN  MAIL:", message);
  }
  console.log(" SEARCH TOKEN  MAIL2:", tokenObj);
};

export const refreshToken = (req, res, next) => {
  let refreshToken = getToken(req);

  if (refreshToken) {
    jwt.verify(refreshToken, SECRET, (err, payload) => {
      if (err) {
        if (err.message === "jwt expired") {
          res.status(403).send({ message: "Token expired" });
        } else {
          console.log(err);

          res.status(403).send({ message: "Failed to authenticate token." });
        }
      } else {
        if (payload.type === "refresh") {
          User.findOne(
            {
              refreshToken: refreshToken
            },
            ["password", "name", "email", "username"],
            async function(err, user) {
              if (err) {
                throw err;
              }

              if (!user) {
                return res
                  .status(401)
                  .json({ message: "Authentication failed." });
              } else if (user) {
                user.refreshToken = createRefreshToken();
                user.save((err, result) => {
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    res.json({
                      message: "Welcome",
                      token: createToken(result),
                      refreshToken: result.refreshToken,
                      name: result.name
                    });
                  }
                });
              }
            }
          );
        } else {
          res.status(403).send({ message: "Failed to authenticate token." });
        }
      }
    });
  } else {
    return res.status(403).send({ message: "No Token provided" });
  }
};
