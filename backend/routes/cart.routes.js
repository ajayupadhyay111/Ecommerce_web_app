import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { cartController } from '../controllers/cart.controller.js';
const router = express.Router();

router.route("/addToCart").post(authenticateToken,cartController.addProductInCart)
router.route("/getCartProducts").get(authenticateToken,cartController.getCartProducts)
// router.route("/removeProductFromCart").post(authenticateToken,cartController.removeProductFromCart)
export default router;