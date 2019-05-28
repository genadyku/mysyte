import {User} from "../models";

export async function GetUserByToken(token) {
const { _id } = token;
let user;

try {
  user = await User.findOne({ _id }, {password: 0});
} catch (e) {
  throw e;
}
 return user;
}
