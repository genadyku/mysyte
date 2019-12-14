import express from "express";

import * as authController from "./controllers/auth-controller";

const router = new express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/forgot", authController.forgot);
router.post("/verify/:token", authController.verify);
router.post("/setpassword", authController.setpassword);
router.post("/verifymail/:token", authController.verifymail);
router.post("/resendmail/:token", authController.resendmail);
router.get("/refreshToken", authController.refreshToken);

export default router;
