const nodemailer = require("nodemailer");
import config from "config";

export function sendVerificationEmail(sender, recip, user, token, cb) {
  const host = config.get("host");
  let smtpTransport = nodemailer.createTransport({
    host: config.get("email_uri"),
    port: config.get("email_port"),
    auth: {
        user: config.get("aut_user"),
        pass: config.get("aut_passw"),
    },
  });
let mailOptions = {
  from: sender,
  to: recip,
  subject: "Sending Email using Node.js[nodemailer]",
  text: `Спасибо за регистрацию ! Пользователь «${user}» (${recip})\n
  инициировал запрос на проверку этого адреса электронной почты kumpel62@list.ru.
  Вы должны перейти по этой ссылке, чтобы активировать свою учетную запись: \n
  Пожалуйста, нажмите на следующую ссылку или вставьте ее в браузер, чтобы завершить процесс:\n
  http://${host}/verifymail/${token}\n\n`,
};

smtpTransport.sendMail(mailOptions, cb);
 return cb;
}
export function sendUpdatePassw(sender, recip, user, token, cb) {
  const host = config.get("host");
  let smtpTransport = nodemailer.createTransport({
    host: config.get("email_uri"),
    port: config.get("email_port"),
    auth: {
      user: config.get("aut_user"),
      pass: config.get("aut_passw"),
    },
  });


  let mailOptions = {
    from: sender,
    to: recip,
    subject: "Sending Email using Node.js[nodemailer]",
    text: `Вы получаете это письмо, потому что кто- то сбросил пароль, связанный с этим письмом.
  Даже не беспокойтесь об этом! Мы сбросили ваш пароль,\n
  поэтому вы можете создать новый, используя ссылку ниже:\n
  http://${host}/reset/${token}\n\n\n`,
  };

  smtpTransport.sendMail(mailOptions, cb);
  return cb;
}
