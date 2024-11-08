import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { getStoreRequests } from '../controllers/admin';
import { isAuthenticatedAdmin } from '../middlewares/isAuthenticatedAdmin';
const router = express.Router();

router.route("/get-store-request").get(isAuthenticated, isAuthenticatedAdmin, getStoreRequests);

export default router;