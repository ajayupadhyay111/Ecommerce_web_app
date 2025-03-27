import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { productController } from '../controllers/product.controller.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import upload from '../config/multer.js';
const router = express.Router();

router.route("/newProduct").post(upload.array("images",4), authenticateToken,adminMiddleware,productController.createProduct)
router.route("/updateProduct/:id").put(authenticateToken,productController.updateProduct)
router.route("/deleteProduct/:id").delete(authenticateToken,productController.deleteProduct)
router.route("/:id").get(authenticateToken,productController.getProductById)
router.route("/filterProduct").get(authenticateToken,productController.filteredProduct)
export default router