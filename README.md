# Ceramerro Backend

Backend API for Ceramerro, an elegant platform connecting ceramic artisans with customers worldwide.

## 📋 Project Overview

Ceramerro is a specialized e-commerce platform designed for ceramic artisans to showcase and sell their handcrafted creations. This repository contains the backend API built with Express.js and MongoDB, providing all the necessary endpoints to power the Ceramerro web application.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access (Admin, Artisan, Customer)
  - Secure password management
  
  
- **Artisan Management**
  - Artisan profile creation and management
  - Sales dashboard and analytics
  - Order management system
  
- **Product Management**
  - CRUD operations for ceramic products
  - Product filtering and search capabilities
  - Limited editions and collection management
  - Ratings and reviews system
  
- **E-commerce Functionality**
  - Shopping cart management
  - Wishlist functionality
  - Secure payment processing
  - Order tracking and history
  - Revenue distribution to artisans
  
- **Content Management**
  - Blog article management
  - Artisan interview content
  - Care guides and product information
  
- **Communication System**
  - Messaging between customers and artisans
  - Notification system
  - Email templates for transactional emails
  
- **Internationalization**
  - Multi-language support
  - Multi-currency support
  - Region-specific content

## 🛠️ Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT


## 🔧 Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- AWS account (for S3 file storage)
- Stripe account (for payment processing)
- SendGrid account (for email services)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ceramerro/backend.git
   cd ceramerro-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```


## 🧪 Testing

Run tests with:

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep="Authentication"
```

## 🚀 Deployment

### Deployment to Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Deployment with Docker

1. Build the Docker image:
   ```bash
   docker build -t ceramerro-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 5000:5000 -d ceramerro-backend
   ```

## 📝 Development Guidelines

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Write tests for all new features
- Use descriptive commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
- Document all API endpoints with JSDoc comments

## 📚 Additional Documentation

- [Authentication Flow](docs/authentication.md)
- [Payment Processing](docs/payments.md)
- [File Upload Guidelines](docs/file-uploads.md)
- [Internationalization](docs/i18n.md)

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 👥 Contributors

- [HOUAS CHAIMAA](https://github.com/CHAIMYY)


## 🤝 Support

Made with ❤️ .
