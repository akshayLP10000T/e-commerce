import express from 'express';
import { getStoreRequests, giveStoreAccess } from '../controllers/admin';
import { isAuthenticatedAdmin } from '../middlewares/isAuthenticatedAdmin';
const router = express.Router();

router.route("/get-store-request").get(isAuthenticatedAdmin, getStoreRequests);
router.route("/give-store-access/:id").get(isAuthenticatedAdmin, giveStoreAccess);

export default router;