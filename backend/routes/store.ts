import express from 'express';
import upload from '../middlewares/multer';
import { isAuthenticatedStoreOwner } from '../middlewares/isAuthenticatedStoreOwner';
import { addItem, deleteItem, getAllItems, getStoreData } from '../controllers/store';
const router = express.Router();

router.route("/get-store-data").get(isAuthenticatedStoreOwner, getStoreData);
router.route("/add-item").post(isAuthenticatedStoreOwner, upload.single('image'), addItem);
router.route("/get-all-items").get(isAuthenticatedStoreOwner, getAllItems);
router.route("/delete/:id").get(isAuthenticatedStoreOwner, deleteItem);

export default router;