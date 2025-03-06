# Backend System Documentation

## Project Overview
The backend system provides the necessary API endpoints, database management, secure authentication, and business logic to support the frontend of the application. This project is built using Node.js and Sequelize ORM, with MySQL as the database.

### Key Features
- **Secure Authentication**: Using JWT (JSON Web Token) for user authentication.
- **Database Management**: Using Sequelize ORM to manage and interact with the MySQL database.
- **API Endpoints**: Provides RESTful API endpoints for interacting with various resources such as users, blogs, travels, families, and apostles.
- **Business Logic**: Includes various models and relationships between entities (users, families, etc.) to manage data and implement business rules.

## Project Structure

```bash
backend-system/
│
├── config/
│   ├── database.js           Sequelize instance configuration
│
├── models/
│   ├── User.js              # User model definition
│   ├── Family.js            # Family model definition
│   ├── Apostle.js           # Apostle model definition
│   ├── Blog.js              # Blog model definition
│   ├── Travel.js            # Travel model definition
│   └── index.js             # Initialize models and associations
│
├── routes/
│   ├── userRoutes.js        # Routes for User-related operations
│   ├── familyRoutes.js      # Routes for Family-related operations
│   ├── blogRoutes.js        # Routes for Blog-related operations
│   └── travelRoutes.js      # Routes for Travel-related operations
│
├── controllers/
│   ├── userController.js    # Business logic for User routes
│   ├── familyController.js  # Business logic for Family routes
│   ├── blogController.js    # Business logic for Blog routes
│   └── travelController.js  # Business logic for Travel routes
│
├── middleware/
│   └── authMiddleware.js    # Middleware for authenticating JWT tokens
│
├── .env                     # Environment variables (e.g., database credentials, JWT secret)
├── package.json             # Project dependencies and scripts
└── server.js                # Main server file
```



# Setup and Installation
To set up the backend system locally, follow the steps below:

## Clone the Repository

```bash
git clone <repository_url>
cd backend-system
```
# Install Dependencies
Make sure you have Node.js installed, then run:

```bash
npm install

```
# Set Up Environment Variables
Create a `.env` file in the root of the project with the following contents:

```env
DB_HOST=localhost
DB_NAME=database_name
DB_USER=yourmysqluser
DB_PASS=yoursqlpassword
```
# Run the Application

## 4. Run the Application
Start the backend server by running the following command:

```bash
npm start
```
# 5. Sync Database Models
To sync the models with the database, run the following command:

```bash
node models/index.js
```
# API Endpoints
The following are the main API endpoints available in the backend system:

## User Routes
- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Login an existing user and receive a JWT token.
- **GET** `/api/users/:id`: Get user details by ID (protected route).
- **Delete** `/api/user/:id` Delete user by  ID>

## Family Routes
- **POST** `/api/families`: Create a new family.
- **GET** `/api/families/:id`: Get family details by ID.
- **Delete** `/api/families/:id` Delete family by  ID

## Blog Routes
- **POST** `/api/blogs`: Create a new blog post (requires authentication).
- **GET** `/api/blogs`: Get a list of blog posts.
- **GET** `/api/blogs/:id`: Get blog post by ID.
- **Delete** `/api/blogs/:id` Delete blog by post ID

## Travel Routes
- **POST** `/api/travels`: Create a new travel record (requires authentication).
- **GET** `/api/travels`: Get a list of travel records.
- **Delete** `/api/travels/:id` Delete travels by post ID

# Authentication
The backend uses JWT (JSON Web Tokens) for secure authentication.

## Register
To register a new user, send a **POST** request to `/api/users/register` with the following payload:

```json
{
  "fullName": "John Doe",
  "studentId": "12345",
  "gender": "Male",
  "email": "john.doe@example.com",
  "password": "password123",
  "batch": "2025"
}

```


