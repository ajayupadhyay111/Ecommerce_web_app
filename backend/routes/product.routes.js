import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { productController } from '../controllers/product.controller.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import upload from '../config/multer.js';
const router = express.Router();

router.route("/newProduct").post(upload.array("images",4), authenticateToken,adminMiddleware,productController.createProduct)
router.route("/updateProduct/:id").put(upload.array("images",4),authenticateToken,productController.updateProduct)
router.route("/deleteProduct/:id").delete(authenticateToken,productController.deleteProduct)
router.route("/getProducts").get(authenticateToken,productController.getProducts)
router.route("/filterProduct").get(productController.filteredProduct)
router.route("/:id").get(productController.getProductById)

export default router   