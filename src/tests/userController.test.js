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


      it('should return 401 when password is incorrect', async () => {
        const req = {
          body: {
            email: 'test@example.com',
            password: 'wrongpassword'
          }
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
        
        const mockUser = {
          email: 'test@example.com',
          comparePassword: jest.fn().mockReturnValue(false)
        };
        
        User.findOne.mockResolvedValue(mockUser);
        
        await userController.login(req, res);
        
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongpassword');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ 
          message: 'Authentication failed. Invalid user or password.' 
        });
      });
  
      it('should return 500 on server error', async () => {
        const req = {
          body: {
            email: 'test@example.com',
            password: 'password123'
          }
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
        
        const error = new Error('Database error');
        User.findOne.mockRejectedValue(error);
        
        await userController.login(req, res);
        
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ 
          message: 'Error in authentication' 
        });
      });

  });


});



// const bcrypt = require('bcrypt');
// const { register } = require('../controllers/userController'); // Adjust path as needed
// const User = require('../models/user'); // Adjust path as needed

// // Mock dependencies
// jest.mock('../models/user');

// describe('User Registration Tests', () => {
//   let req, res;
  
//   beforeEach(() => {
//     // Reset mocks before each test
//     jest.clearAllMocks();
    
//     // Mock request and response objects
//     req = {
//       body: {
//         firstname: 'John',
//         lastname: 'Doe',
//         email: 'john.doe@example.com',
//         password: 'Password123!'
//       }
//     };
    
//     res = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//       json: jest.fn()
//     };
    
//     // Mock User model
//     User.mockImplementation(function(data) {
//       this.data = data;
//       this.save = jest.fn().mockResolvedValue({
//         ...data,
//         hash_password: 'hashed_password',
//         _id: 'mock_id'
//       });
//     });
    
//     // Mock bcrypt
//     bcrypt.hashSync = jest.fn().mockReturnValue('hashed_password');
//   });
  
//   test('should successfully register a client user', async () => {
//     // Arrange
//     req.body.role = 'client';
    
//     // Act
//     await register(req, res);
    
//     // Assert
//     expect(User).toHaveBeenCalledWith({
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'john.doe@example.com',
//       password: 'Password123!',
//       role: 'client'
//     });
//     expect(bcrypt.hashSync).toHaveBeenCalledWith('Password123!', 10);
//     expect(res.json).toHaveBeenCalled();
//     const responseUser = res.json.mock.calls[0][0];
//     expect(responseUser.hash_password).toBeUndefined();
//   });
  
//   test('should successfully register an artisan user', async () => {
//     // Arrange
//     req.body.role = 'artisan';
//     req.body.name = 'Craft Studio';
//     req.body.specialty = 'Woodworking';
//     req.body.bio = 'Artisan bio';
//     req.body.location = 'New York';
//     req.body.image = 'profile.jpg';
//     req.body.gallery = ['image1.jpg', 'image2.jpg'];
//     req.body.category = 'Furniture';
//     req.body.featured = true;
//     req.body.socialMedia = { instagram: '@craftstudio', twitter: '@craftstudio' };
//     req.body.process = ['Design', 'Build', 'Finish'];
    
//     // Act
//     await register(req, res);
    
//     // Assert
//     expect(User).toHaveBeenCalledWith({
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'john.doe@example.com',
//       password: 'Password123!',
//       role: 'artisan',
//       name: 'Craft Studio',
//       specialty: 'Woodworking',
//       bio: 'Artisan bio',
//       location: 'New York',
//       image: 'profile.jpg',
//       gallery: ['image1.jpg', 'image2.jpg'],
//       category: 'Furniture',
//       featured: true,
//       socialMedia: { instagram: '@craftstudio', twitter: '@craftstudio' },
//       process: ['Design', 'Build', 'Finish']
//     });
//     expect(bcrypt.hashSync).toHaveBeenCalledWith('Password123!', 10);
//     expect(res.json).toHaveBeenCalled();
//   });
  
//   test('should return error for invalid role type', async () => {
//     // Arrange
//     req.body.role = 'invalid_role';
    
//     // Act
//     await register(req, res);
    
//     // Assert
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith({ message: 'Invalid role type' });
//     expect(User).not.toHaveBeenCalled();
//   });
  
//   test('should handle errors during user registration', async () => {
//     // Arrange
//     req.body.role = 'client';
//     const errorMessage = 'Email already exists';
//     User.mockImplementationOnce(function() {
//       this.save = jest.fn().mockRejectedValue(new Error(errorMessage));
//     });
    
//     // Act
//     await register(req, res);
    
//     // Assert
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
//   });
  
//   test('should hash password before saving', async () => {
//     // Arrange
//     req.body.role = 'client';
    
//     // Act
//     await register(req, res);
    
//     // Assert
//     expect(bcrypt.hashSync).toHaveBeenCalledWith('Password123!', 10);
//   });
  
//   test('should not return hash_password in response', async () => {
//     // Arrange
//     req.body.role = 'client';
    
//     // Act
//     await register(req, res);
    
//     // Assert
//     const responseUser = res.json.mock.calls[0][0];
//     expect(responseUser.hash_password).toBeUndefined();
//   });
  
//   test('should handle missing required fields', async () => {
//     // Arrange
//     req.body = {
//       role: 'client',
//       // Missing firstname, lastname, email, password
//     };
//     const errorMessage = 'Validation failed: required fields missing';
//     User.mockImplementationOnce(function() {
//       this.save = jest.fn().mockRejectedValue(new Error(errorMessage));
//     });
    
//     // Act
//     await register(req, res);
    
//     // Assert
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
//   });
  
//   test('should handle email validation', async () => {
//     // Arrange
//     req.body.role = 'client';
//     req.body.email = 'invalid-email';
//     const errorMessage = 'Validation failed: invalid email format';
//     User.mockImplementationOnce(function() {
//       this.save = jest.fn().mockRejectedValue(new Error(errorMessage));
//     });
    
//     // Act
//     await register(req, res);
    
//     // Assert
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
//   });
// });

