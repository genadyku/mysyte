import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";

import initHandlers from "./handlers";
import connectorsInit from "./connectors";
import autRoute from "./modules/auth";

import articleRoute from "./routes/article";
import lessonsRoute from "./routes/lessons";

connectorsInit();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initHandlers(app);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "gentem"
  })
);
app.use("/api", articleRoute);
app.use("/api", lessonsRoute);
app.use("/api", autRoute);

app.get("/articles", function(req, res) {
  res.send("hello articles");
});

app.get("/chapter", function(req, res) {
  res.send("hello chapter");
});

app.get("/", function(req, res) {
  res.send("hello");
});
export default app;
