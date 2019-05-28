
import * as UserService from "../services/UserService";

export async function getCurrentUser(req, res, next) {
const { token } = req;

let user;
try {
 user = await UserService.GetUserByToken(token);
} catch ({message}) {
return next({
 status: 500,
 message,
 });
}
 return res.json(user);
}
