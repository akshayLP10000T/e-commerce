import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { getStoreRequests, giveStoreAccess } from '../controllers/admin';
import { isAuthenticatedAdmin } from '../middlewares/isAuthenticatedAdmin';
const router = express.Router();

router.route("/get-store-request").get(isAuthenticated, isAuthenticatedAdmin, getStoreRequests);
router.route("/give-store-access/:id").get(isAuthenticated, isAuthenticatedAdmin, giveStoreAccess);

export default router;