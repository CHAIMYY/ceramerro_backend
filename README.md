# Ceramerro Backend

Backend API for Ceramerro, an elegant platform connecting ceramic artisans with customers worldwide.

## 📋 Project Overview

Ceramerro is a specialized e-commerce platform designed for ceramic artisans to showcase and sell their handcrafted creations. This repository contains the backend API built with Express.js and MongoDB, providing all the necessary endpoints to power the Ceramerro web application.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access (Admin, Artisan, Customer)
  - Secure password management
  - Social authentication (Google, Facebook)
  
- **Artisan Management**
  - Artisan profile creation and management
  - Portfolio and showcase management
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
- **Authentication**: JWT, Passport.js
- **File Storage**: AWS S3
- **Payment Processing**: Stripe API
- **Email Service**: Nodemailer with SendGrid
- **Validation**: Joi
- **Documentation**: Swagger/OpenAPI

## 🏗️ Project Structure

```
├── config/                 # Configuration files
│   ├── db.js               # Database connection
│   ├── auth.js             # Authentication config
│   └── aws.js              # AWS S3 configuration
├── controllers/            # Request handlers
│   ├── auth.js             # Authentication controllers
│   ├── users.js            # User management
│   ├── artisans.js         # Artisan-specific controllers
│   ├── products.js         # Product management
│   ├── orders.js           # Order processing
│   ├── payment.js          # Payment processing
│   └── blog.js             # Blog content management
├── middleware/             # Custom middleware
│   ├── auth.js             # Authentication middleware
│   ├── validation.js       # Request validation
│   ├── uploads.js          # File upload handling
│   └── errorHandler.js     # Global error handler
├── models/                 # Database models
│   ├── User.js             # User model
│   ├── Artisan.js          # Artisan profile model
│   ├── Product.js          # Product model
│   ├── Order.js            # Order model
│   ├── Payment.js          # Payment records
│   └── Post.js             # Blog post model
├── routes/                 # API routes
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User routes
│   ├── artisans.js         # Artisan routes
│   ├── products.js         # Product routes
│   ├── orders.js           # Order routes
│   ├── payment.js          # Payment routes
│   └── blog.js             # Blog content routes
├── services/               # Business logic
│   ├── email.js            # Email service
│   ├── storage.js          # File storage service
│   ├── payment.js          # Payment processing
│   └── analytics.js        # Business analytics
├── utils/                  # Utility functions
│   ├── validators.js       # Custom validators
│   ├── formatters.js       # Response formatters
│   └── helpers.js          # Common helper functions
├── app.js                  # Express application setup
├── server.js               # Server entry point
├── .env.example            # Example environment variables
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

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

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ceramerro

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=your_aws_region

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@ceramerro.com

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Admin
ADMIN_EMAIL=admin@ceramerro.com
ADMIN_PASSWORD=initial_admin_password
```

## 🚦 API Endpoints

The API documentation is available through Swagger at `/api-docs` when the server is running.

### Main Endpoint Groups:

- **Authentication**: `/api/auth`
- **Users**: `/api/users`
- **Artisans**: `/api/artisans`
- **Products**: `/api/products`
- **Orders**: `/api/orders`
- **Payments**: `/api/payments`
- **Blog**: `/api/blog`

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

- [Founder Name](https://github.com/founder)
- [Lead Developer](https://github.com/lead-dev)

## 🤝 Support

For support, please email support@ceramerro.com or open an issue in this repository.
