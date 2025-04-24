import cartModel from "../models/cart.model.js";
import User from "../models/user.model.js";

export const cartController = {
  addProductInCart: async (req, res) => {
    const { id, size, quantity, price, type } = req.body;
    const userEmail = req.email;
    const user = await User.findOne({ email: userEmail });
    const userId = user._id;
    try {
      // es line of code se user ne jitne bhi products add kiye hain cart mein wo mil jayenge
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
        (item) => item.productId.toString() === id && item.size === size
      );

      if (existingProduct) {
        // If the same product with same size exists, increase quantity
        if (type === "increase") {
          existingProduct.quantity += 1;
        } else if (type === "decrease") {
          existingProduct.quantity -= 1;
        }
      } else {
        // Add new product with different size or new product
        cart.products.push({
          productId: id,
          size,
          quantity: quantity,
        });
      }
      // Update totalPrice
      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.quantity * price,
        0
      );
      let productsQuantities = cart.products.length;
      // Save the cart
      await cart.save();

      // populate the cart with product details
      await cart.populate("products.productId", "name price images");

      res
        .status(200)
        .json({ message: "Product added to cart", cart, productsQuantities });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ message: "Server error", error });
    }
  },
  getCartProducts: async (req, res) => {
    try {
      const userEmail = req.email;
      const user = await User.findOne({ email: userEmail });
      const userId = user._id; // Get the user ID from the user object

      const cartProducts = await cartModel
        .findOne({ userId })
        .populate("products.productId", "name price images");

      if (!cartProducts) {
        return res.status(404).json({ message: "Cart not found" });
      }
      const productsQuantities = cartProducts.products.length;
      const totalPrice = cartProducts.totalPrice;

      res.status(200).json({
        message: "Cart products retrieved successfully",
        products: cartProducts.products,
        totalPrice,
        productsQuantities,
      });
    } catch (error) {
      console.error("Error retrieving cart products:", error);
      res.status(500).json({ message: "Server error", error });
    }
  },
  deleteProductInCart: async (request, response, next) => {
    try {
      const { id } = request.params;
      const userEmail = request.email;
      const user = await User.findOne({ email: userEmail });
      const userId = user._id; // Get the user ID from the user object

      const cartProduct = await cartModel.findOne({ userId });
      if (!cartProduct) {
        return response.status(404).json({ message: "Cart not found" });
      }
      const productIndex = cartProduct.products.findIndex(
        (item) => item.productId.toString() === id
      );

      if (productIndex === -1) {
        return response
          .status(404)
          .json({ message: "Product not found in cart" });
      }
      // Remove the product from the cart
      cartProduct.products.splice(productIndex, 1);
      // Update totalPrice
      cartProduct.totalPrice = cartProduct.products.reduce(
        (total, item) => total + item.quantity * item.productId.price,
        0
      );
      // Save the updated cart
      await cartProduct.save();
      // Populate the cart with product details
      await cartProduct.populate("products.productId", "name price images");
      const productsQuantities = cartProduct.products.length;
      const totalPrice = cartProduct.totalPrice;

      response.status(200).json({
        message: "Product removed from cart",
        cart: cartProduct,
        totalPrice,
        productsQuantities,
      });
    } catch (error) {
      next(error);
    }
  },
};
