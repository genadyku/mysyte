import express from "express";

import * as authController from "./controllers/auth-controller";

const router = new express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/verifymail/:token", authController.verifymail);
router.post("/resendmail/:token", authController.resendmail);
router.get("/refreshToken", authController.refreshToken);

export default router;
