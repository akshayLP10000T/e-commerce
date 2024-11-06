import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/update-profile").put(isAuthenticated, updateProfile);

export default router;