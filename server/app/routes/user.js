import express from "express";


 import * as UserController from "../modules/users/controllers/user";

const router = express.Router();

  router.get("/current-user", UserController.getCurrentUser );
export default router;
