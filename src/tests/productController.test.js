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
          name: 'Test Product',
          price: 99.99,
          description: 'Test description'
        },
        params: {
          id: 'product123'
        },
        user: {
          _id: 'user123'
        }
      };
      
      res = {
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        error: jest.fn().mockReturnThis()
      };
    });


    describe("createProduct", () => {

        it('should create a new product and return 201 status', async () => {
           
            const mockProductInstance = {
              save: jest.fn().mockResolvedValue({}),
              ...req.body
            };
            Product.mockImplementation(() => mockProductInstance);
            
            await productController.createProduct(req, res);
            
            expect(Product).toHaveBeenCalledWith(req.body);
            expect(mockProductInstance.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockProductInstance);
          });


          it('should return 500 when product creation fails', async () => {
            const error = new Error('Database error');
            const mockProductInstance = {
              save: jest.fn().mockRejectedValue(error)
            };
            Product.mockImplementation(() => mockProductInstance);
            
            await productController.createProduct(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.error).toHaveBeenCalledWith({ 
              message: 'failed creating a product', 
              error: error 
            });
          });
        



    });
});