import errorHandler from "errorhandler";
import app from "./app";
import {PORT} from "./config";


app.use(errorHandler());

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
   console.log(`Server runing on port ${PORT}`);
});
export default server;

