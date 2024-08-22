# Nalanda Library Management System

## Overview

Nalanda Library Management System is a backend application built with Node.js, Express, MongoDB, and GraphQL. It provides both REST and GraphQL APIs for managing a library system, including user authentication, book management, and borrowing functionalities.

## Features

- User authentication (register, login)
- Book management (add, update, delete, list)
- Borrowing system (borrow, return, history)
- Role-based access control (admin and member roles)
- REST and GraphQL APIs
- Pagination for book listings
- Input validation
- Error handling
- Rate limiting
- CORS enabled
- Logging

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)

## Installation

1. Clone the repository:
   git clone https://github.com/mannilmuhsin/HeumnInteractive.git
   cd nalanda-library

2. Install the dependencies:
   npm install

3. Create a `.env` file in the root directory with the following content:
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/nalanda_library
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   Replace `your_jwt_secret_here` with a secure secret key for JWT token generation.

4. Ensure MongoDB is running on your local machine or update the `MONGO_URI` in the `.env` file to point to your MongoDB instance.

## Running the Application

1. To start the server in development mode:
   npm run dev

2. To start the server in production mode:
   npm start

The server will start running at `http://localhost:5000` (or the port specified in your environment variables).

## API Documentation

### REST API Endpoints

- POST `/api/v1/users/register` - Register a new user
- POST `/api/v1/users/login` - Login user
- GET `/api/v1/books` - Get all books (with pagination)
- POST `/api/v1/books` - Add a new book (admin only)
- PUT `/api/v1/books/:id` - Update a book (admin only)
- DELETE `/api/v1/books/:id` - Delete a book (admin only)
- POST `/api/v1/borrows` - Borrow a book
- PUT `/api/v1/borrows/:id` - Return a book
- GET `/api/v1/borrows/history` - Get borrow history for the logged-in user

### GraphQL API

The GraphQL endpoint is available at `/graphql`. You can use tools like GraphQL Playground or Apollo Studio to interact with the GraphQL API.

