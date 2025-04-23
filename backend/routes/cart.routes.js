import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { cartController } from '../controllers/cart.controller.js';
const router = express.Router();

router.route("/addToCart").post(authenticateToken,cartController.addProductInCart)

export default router;