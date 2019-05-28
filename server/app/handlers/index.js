import logger from "morgan";
import {IS_DEV} from "../utils/env";


export default (app) => {
  if (IS_DEV) {
    app.use(logger("tiny"));
  }
};
