import express from 'express';
import { applyForStore, getUserData, login, logout, register, updateProfile } from '../controllers/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/update-profile").put(isAuthenticated, updateProfile);
router.route("/get-user-data").get(isAuthenticated, getUserData);
router.route("/apply-store").post(isAuthenticated, applyForStore);

export default router;