const Product = require("../models/productModel");
const productController = require("../controllers/productController");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/productModel");

describe("Product Controller", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        name: "Test Product",
        price: 99.99,
        description: "Test description",
      },
      params: {
        id: "product123",
      },
      user: {
        _id: "user123",
      },
    };

    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      error: jest.fn().mockReturnThis(),
    };
  });

  describe("updateProduct", () => {
    it("should update a product and return it", async () => {
      const updatedProduct = {
        _id: "product123",
        ...req.body,
      };

      Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

      await productController.updateProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        "product123",
        req.body,
        { new: true },
      );
      expect(res.json).toHaveBeenCalledWith(updatedProduct);
    });

    it("should return 404 when product is not found for update", async () => {
      Product.findByIdAndUpdate.mockResolvedValue(null);

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "could not find the product",
      });
    });
  });

  describe("deleteProduct", () => {
    it("should return 404 when product is not found for deletion", async () => {
      Product.findByIdAndDelete.mockResolvedValue(null);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "could not find the product",
      });
    });
  });

  describe("getProductById", () => {
    it("should return a product by id", async () => {
      const mockProduct = {
        _id: "product123",
        name: "Test Product",
      };

      Product.findById.mockResolvedValue(mockProduct);

      await productController.getProductById(req, res);

      expect(Product.findById).toHaveBeenCalledWith("product123");
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it("should return 404 when product is not found", async () => {
      Product.findById.mockResolvedValue(null);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "product not found",
      });
    });

    it("should return 500 when fetching product by id fails", async () => {
      const error = new Error("Database error");
      Product.findById.mockRejectedValue(error);

      await productController.getProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching product",
        error: error,
      });
    });
  });
});
