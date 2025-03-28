import productModel from "../models/product.model.js";

export const productController = {
  createProduct: async (request, response, next) => {
    try {
      if (!request.files || request.files.length === 0) {
        return response.status(400).send("No files uploaded.");
      }
      const uploadedImages = request.files.map((file) => ({
        url: file.path, // Cloudinary URL
        public_id: file.filename, // Cloudinary Public ID
      }));

      const {
        name,
        brand,
        description,
        price,
        mrp,
        discount,
        category,
        stock,
        sizes,
        highlights,
        status,
      } = request.body;

      // Create new product
      const newProduct = new productModel({
        name,
        brand,
        description,
        price,
        mrp,
        discount,
        category,
        stock,
        images: uploadedImages, // Multiple images stored here
        sizes: JSON.parse(sizes),
        highlights: JSON.parse(highlights),
        status: true,
      });

      await newProduct.save();

      response.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (request, response, next) => {
    try {
      const {
        name,
        brand,
        description,
        price,
        mrp,
        discount,
        category,
        stock,
        sizes,
        highlights,
        status,
      } = request.body;
      const { id } = request.params;

      // Create new product
      const newProduct = await productModel.findByIdAndUpdate(
        id,
        {
          name,
          brand,
          description,
          price,
          mrp,
          discount,
          category,
          stock,
          sizes,
          highlights,
          status: true, // Convert string to boolean
        },
        { new: true }
      );

      await newProduct.save();

      response.status(201).json({
        success: true,
        message: "Product updated successfully",
        product: newProduct,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deleteProduct: async (request, response, next) => {
    try {
      const { id } = request.params;
      const product = await productModel.findByIdAndDelete(id);
      if (!product) {
        return response.status(400).json({ message: "Product not found" });
      }
      response
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (request,response,next) => {
    try {
      const {id} = request.params;
      const product = await productModel.findById(id)
      if(!product){
        return response.status(404).json({product})
      }
      response.status(200).json({product})
    } catch (error) {
      next(error)
    }
  },
  filteredProduct: async (request, response, next) => {
    try {
      const {} = request.query;
    } catch (error) {
      next(error);
    }
  },
  getProducts: async (request, response, next) => {
    try {
      const { limit, page } = request.query;
      const products = await productModel
        .find()
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));
      response.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  },
};
