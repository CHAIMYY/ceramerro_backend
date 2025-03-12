const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userController = require("../controllers/userController");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/userModel");

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should login a user and return a JWT token", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const mockUser = {
        _id: "userId",
        firstname: "dawya",
        lastname: "bntAmer",
        email: "test@example.com",
        comparePassword: jest.fn().mockReturnValue(true),
     
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue("mockToken");

      await userController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith("password123");
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          email: "test@example.com",
          firstname: "dawya",
          lastname: "bntAmer",
          _id: "userId",
       
        },
        process.env.JWT_SECRET || "RESTFULAPIs"
      );
      expect(res.json).toHaveBeenCalledWith({ token: "mockToken" });
    });


    it('should return 401 when user is not found', async () => {
        const req = {
          body: {
            email: 'nonexistent@example.com',
            password: 'password123'
          }
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
        
        User.findOne.mockResolvedValue(null);
        
        await userController.login(req, res);
        
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ 
          message: 'Authentication failed. Invalid user or password.' 
        });
      });


  });
});
