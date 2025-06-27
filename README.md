# MERN Stack Login and Registration Application

This repository contains a full-stack web application demonstrating user authentication (login and registration) using the MERN stack.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Running the Application](#running-the-application)
    -   [Backend (Server)](#backend-server)
    -   [Frontend (Client)](#frontend-client)
-   [API Endpoints](#api-endpoints)
-   [Folder Structure](#folder-structure)
-   [License](#license)
-   [Contact](#contact)

## Project Overview

This application serves as a basic template for building secure web applications with user accounts. It includes functionalities for creating new user accounts, logging in existing users, and protecting routes that require authentication.

## Features

* **User Registration:** Create new user accounts with unique credentials.
* **User Login:** Authenticate existing users.
* **Secure Password Hashing:** Passwords are securely stored using `bcryptjs`.
* **JSON Web Token (JWT) Authentication:** Securely manage user sessions and authorize API requests.
* **Protected Routes:** API endpoints and frontend routes can be protected, allowing access only to authenticated users.
* **Responsive UI:** Basic responsive design for a better user experience across devices.

## Technologies Used

This project leverages the following key technologies:

### Backend (Node.js & Express.js)

* **Node.js**: Server-side JavaScript runtime.
* **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
* **MongoDB**: NoSQL database for flexible data storage.
* **Mongoose**: MongoDB object data modeling (ODM) for Node.js, simplifying interactions with MongoDB.
* **bcryptjs**: Library to hash passwords for secure storage.
* **jsonwebtoken (JWT)**: Used for creating, signing, and verifying authentication tokens.
* **dotenv**: To load environment variables from a `.env` file.
* **Nodemon**: (Development dependency) Automatically restarts the node application when file changes are detected.

### Frontend (React)

* **React**: A JavaScript library for building user interfaces.
* **React Router DOM**: Declarative routing for React.js.
* **Axios**: A popular promise-based HTTP client for making API requests from the browser.
* **CSS**: For styling the application.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed:

* **Node.js & npm (or Yarn)**: Download and install from [nodejs.org](https://nodejs.org/).
* **MongoDB**:
    * **Local Installation**: Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community).
    * **MongoDB Atlas (Cloud)**: Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com/).
* **Git**: Download and install from [git-scm.com](https://git-scm.com/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/pasindu8/mern-stack-login-and-registration.git](https://github.com/pasindu8/mern-stack-login-and-registration.git)
    cd mern-stack-login-and-registration
    ```

2.  **Install Backend Dependencies:**
    Navigate to the `backend` directory and install the necessary npm packages.
    ```bash
    cd backend
    npm install # or yarn install
    ```

3.  **Configure Backend Environment Variables:**
    In the `backend` directory, create a new file named **`.env`**. Add the following environment variables, replacing the placeholder values with your actual configuration:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string_here
    JWT_SECRET=a_very_secret_and_long_random_string_for_jwt
    ```
    * `MONGO_URI`: Your MongoDB connection string. For a local MongoDB, it might be `mongodb://localhost:27017/your_database_name`. For MongoDB Atlas, get it from your cluster's connection settings.
    * `JWT_SECRET`: A strong, unique, and random string. You can generate one online or use a command like `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` in your terminal.

4.  **Install Frontend Dependencies:**
    Navigate back to the project root and then into the `frontend` directory.
    ```bash
    cd ../frontend
    npm install # or yarn install
    ```

5.  **Configure Frontend Environment Variables (Optional):**
    If your frontend needs to dynamically know the backend API URL (e.g., for different environments), create a file named **`.env`** in the `frontend` directory:
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```
    * Ensure the `REACT_APP_API_URL` matches the `PORT` you set in your backend's `.env` file and the API route prefix (e.g., `/api`).

## Running the Application

### Backend (Server)

From the `backend` directory, start the Node.js server:

cd backend
npm start # or nodemon server.js for development with auto-reload
The backend server will typically run on http://localhost:5000 (or whatever PORT you configured).

Frontend (Client)
From the frontend directory, start the React development server:
cd frontend
npm start
The React application will usually open automatically in your web browser at http://localhost:3000.

API Endpoints
Here are the primary API endpoints managed by the backend:

POST /api/register: Registers a new user.

Request Body: { "username": "...", "email": "...", "password": "..." }

Response: { "message": "User registered successfully", "user": { ... } } or error.

POST /api/login: Logs in an existing user.

Request Body: { "email": "...", "password": "..." }

Response: { "token": "jwt_token_here", "user": { ... } } or error.

GET /api/dashboard (Protected): Example protected route that returns user-specific data.

Headers: Authorization: Bearer <jwt_token>

Response: { "message": "Welcome to your dashboard!", "user": { ... } } or unauthorized error.

Folder Structure
mern-stack-login-and-registration/
├── backend/                  # Contains all server-side code
│   ├── node_modules/         # Node.js dependencies for backend
│   ├── models/               # MongoDB schema definitions (e.g., User.js)
│   ├── routes/               # API routes (e.g., auth.js)
│   ├── controllers/          # Logic for handling API requests
│   ├── middleware/           # Middleware for authentication (e.g., authMiddleware.js)
│   ├── config/               # Database connection setup, JWT config etc.
│   ├── server.js             # Main entry point for the backend server
│   ├── package.json          # Backend dependencies and scripts
│   └── .env                  # Backend environment variables (ignored by Git)
├── frontend/                 # Contains all client-side (React) code
│   ├── node_modules/         # React dependencies for frontend
│   ├── public/               # Static assets for the React app (index.html, favicon)
│   ├── src/                  # React source code
│   │   ├── components/       # Reusable UI components
│   │   ├── Login/            # Login page/component
│   │   ├── Register/         # Registration page/component
│   │   ├── homepages/        # User homepage/dashboard
│   │   ├── api/              # API utility functions (e.g., axios setup)
│   │   ├── App.js            # Main React application component
│   │   ├── index.js          # React app entry point
│   │   └── ...               # Other files (CSS, utils, etc.)
│   ├── package.json          # Frontend dependencies and scripts
│   └── .env                  # Frontend environment variables (if any, ignored by Git)
├── .gitignore                # Specifies files and folders to be ignored by Git (e.g., node_modules, .env)
├── LICENSE                   # Project's open-source license information
└── README.md                 # This documentation file
License
This project is licensed under the [Your Chosen License Name] - see the LICENSE file for details.
(Example: "MIT License")

Contact
Feel free to connect with me if you have any questions, suggestions, or feedback!

Name: Pasindu Dulshan

GitHub: https://github.com/pasindu8

Email: pasindudulshan0608@gmail.com
