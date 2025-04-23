import cartModel from "../models/cart.model.js";

export const cartController = {
  addProductInCart: async (req, res) => {
    const { id: productId, size } = req.body;
    const userId = request.userId;
    try {
      // Find the user's cart
      let cart = await cartModel.findOne({ userId });

      if (!cart) {
        // If no cart exists, create a new one
        cart = new cartModel({
          userId,
          products: [],
          totalPrice: 0,
        });
      }

      // Check if the product with the same ID and size exists
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId && item.size === size
      );

      if (existingProduct) {
        // If the same product with same size exists, increase quantity
        existingProduct.quantity += 1;
      } else {
        // Add new product with different size or new product
        cart.products.push({
          productId,
          size,
          quantity: 1,
        });
      }

      // Update totalPrice
      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.quantity * price,
        0
      );

      await cart.save();
      res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  deleteProductInCart: async (request, response, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  updateProductInCart: async (request, response, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};
