const mongoose = require("mongoose");
const Product = require("../models/productModel");
const productController = require("../controllers/productController");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/productModel");

describe("Product Controller", () => {
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

  describe("createProduct", () => {
    it("should create a new product and return 201 status", async () => {
      const mockProductInstance = {
        save: jest.fn().mockResolvedValue({}),
        ...req.body,
      };
      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(Product).toHaveBeenCalledWith(req.body);
      expect(mockProductInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProductInstance);
    });

    it("should return 500 when product creation fails", async () => {
      const error = new Error("Database error");
      const mockProductInstance = {
        save: jest.fn().mockRejectedValue(error),
      };
      Product.mockImplementation(() => mockProductInstance);

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.error).toHaveBeenCalledWith({
        message: "failed creating a product",
        error: error,
      });
    });
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
        { new: true }
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

    it("should return 500 when product update fails", async () => {
      const error = new Error("Database error");
      Product.findByIdAndUpdate.mockRejectedValue(error);

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.error).toHaveBeenCalledWith({
        message: "failed updating a product",
        error: error,
      });
    });

    describe("deleteProduct", () => {
      it("should delete a product and return success message", async () => {
        const deletedProduct = {
          _id: "product123",
          name: "Test Product",
        };

        Product.findByIdAndDelete.mockResolvedValue(deletedProduct);

        await productController.deleteProduct(req, res);

        expect(Product.findByIdAndDelete).toHaveBeenCalledWith(
          "product123",
          req.body
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: "product deleted succefully",
        });
      });

      it("should return 404 when product is not found for deletion", async () => {
        Product.findByIdAndDelete.mockResolvedValue(null);

        await productController.deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          message: "could not find the product",
        });
      });

      it("should return 500 when product deletion fails", async () => {
        const error = new Error("Database error");
        Product.findByIdAndDelete.mockRejectedValue(error);

        await productController.deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.error).toHaveBeenCalledWith({
          message: "failed deleting a product",
          error: error,
        });
      });
    });

    describe("getAllProduct", () => {
      it("should return all products", async () => {
        const mockProducts = [
          { _id: "product1", name: "Product 1" },
          { _id: "product2", name: "Product 2" },
        ];

        Product.find.mockResolvedValue(mockProducts);

        await productController.getAllProduct(req, res);

        expect(Product.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockProducts);
      });

      it("should return 500 when fetching all products fails", async () => {
        const error = new Error("Database error");
        Product.find.mockRejectedValue(error);

        await productController.getAllProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Error fetching products list",
          error: error,
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
    });
  });
});
