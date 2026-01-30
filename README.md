# Task Manager - Full Stack Application

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-v4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v5.0+-brightgreen)
![License](https://img.shields.io/badge/License-ISC-yellow)

A modern, full-stack task management application built with Node.js, Express, MongoDB, and vanilla JavaScript. Features a clean MVC architecture, RESTful API, and responsive UI.

[Features](#features) • [Installation](#installation) • [API Documentation](#api-documentation) • [Usage](#usage) • [Live Demo](#-live-demo)

### 🚀 Live Demo

**[View Live Application](https://task-manager-omega-kohl-93.vercel.app/)** 

</div>

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Usage](#frontend-usage)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌐 Live Demo

### Access the Application

| Component | Link | Status |
|-----------|------|--------|
| **Frontend** | [https://task-manager-omega-kohl-93.vercel.app/](https://task-manager-omega-kohl-93.vercel.app/) |  Available |
| **API Documentation** | [Backend API Docs](#api-documentation) | Available |

### Demo Credentials


 create your own account by registering!

---

## ✨ Features

### Backend
- ✅ **RESTful API** - Complete CRUD operations for task management
- ✅ **MVC Architecture** - Clean separation of concerns
- ✅ **MongoDB Integration** - Robust data persistence with Mongoose ODM
- ✅ **Environment Variables** - Secure configuration management
- ✅ **Input Validation** - Schema-based validation with custom error messages
- ✅ **Error Handling** - Comprehensive global error handling middleware
- ✅ **CORS Support** - Cross-origin resource sharing enabled
- ✅ **Request Logging** - Automatic logging of all HTTP requests

### Frontend
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Vanilla JavaScript** - No frameworks, pure JS implementation
- ✅ **Dynamic Rendering** - Real-time task list updates
- ✅ **Task Filtering** - Filter by status (All, Pending, In Progress, Completed)
- ✅ **Inline Editing** - Quick status updates via dropdown
- ✅ **Modern UI** - Clean, professional interface with intuitive UX
- ✅ **User Authentication** - Register, login, logout with JWT tokens
- ✅ **User Isolation** - Each user sees only their own tasks
- ✅ **Session Management** - Token persistence with localStorage

---

## 🛠️ Tech Stack

**Backend:**
- Node.js (JavaScript runtime)
- Express.js (Web framework)
- MongoDB (NoSQL database)
- Mongoose (MongoDB ODM)
- bcrypt (Password hashing)
- jsonwebtoken/JWT (Authentication tokens)
- dotenv (Environment variable management)
- cors (CORS middleware)

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- localStorage (Session persistence)

**Development Tools:**
- Nodemon (Auto-reload during development)
- Git (Version control)

---

## 📁 Project Structure

```
global-trend/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection setup
│   │   ├── controllers/
│   │   │   ├── authController.js      # User auth logic (register, login)
│   │   │   └── taskController.js      # Business logic for tasks
│   │   ├── middleware/
│   │   │   └── auth.js                # JWT verification middleware
│   │   ├── models/
│   │   │   ├── User.js                # User schema with password hashing
│   │   │   └── Task.js                # Task schema with userId reference
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # Authentication endpoints
│   │   │   └── taskRoutes.js          # Task API endpoints (protected)
│   │   ├── app.js                     # Express app configuration
│   │   └── server.js                  # Application entry point
│   ├── .env                           # Environment variables (not in repo)
│   ├── .env.example                   # Environment template
│   └── package.json                   # Backend dependencies
├── frontend/
│   ├── css/
│   │   └── styles.css                 # Application styles
│   ├── js/
│   │   └── app.js                     # Task management & auth logic
│   ├── index.html                     # Main task manager page (protected)
│   ├── login.html                     # User login page
│   └── register.html                  # User registration page
├── .gitignore                         # Git ignore rules
└── README.md                          # Project documentation
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - For cloning the repository

To verify installations:
```bash
node --version
npm --version
mongod --version
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "global trend"
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

This will install:
- express
- mongoose
- dotenv
- cors
- nodemon (dev dependency)

### 3. Set Up MongoDB

**Option A: Local MongoDB**
1. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

2. MongoDB will be available at: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string (replace `<password>` and `<dbname>`)

---

## ⚙️ Configuration

### 1. Create Environment File

Navigate to the backend directory and create a `.env` file:

```bash
cd backend
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/task_manager

# JWT Authentication
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d

# For MongoDB Atlas, use this format:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/task_manager?retryWrites=true&w=majority
```

**Environment Variables Explained:**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port number for the server | 5000 |
| `NODE_ENV` | Environment (development/production) | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/task_manager |
| `JWT_SECRET` | Secret key for signing JWT tokens | - |
| `JWT_EXPIRE` | JWT token expiration time | 7d |

**⚠️ Production Security:**
Always change `JWT_SECRET` to a long, random string in production. Use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 🎯 Running the Application

### Development Mode (Recommended)

```bash
cd backend
npm run dev
```

This starts the server with **nodemon** for auto-reload on file changes.

### Production Mode

```bash
cd backend
npm start
```

### Expected Output

```
Server is running on port 5000
MongoDB Connected: localhost
```

### Access the Application

- **Frontend**: Open `frontend/index.html` in your browser or use a local server
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/ (should return welcome message)

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
The API uses **JWT (JSON Web Token)** authentication. All task endpoints require a valid token.

**How to Get a Token:**
1. Register or login at `/api/auth/register` or `/api/auth/login`
2. Receive JWT token in response
3. Include token in all subsequent requests:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

**Token Storage:**
- Frontend stores token in `localStorage.token`
- Automatically included in all API request headers

---

### Authentication Endpoints

#### 1. Register New User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Field Specifications:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | String | Yes | Valid email format, must be unique |
| `password` | String | Yes | Min 6 characters |

**Response:** `201 Created`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "createdAt": "2026-01-31T10:00:00.000Z"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Email already exists or validation failed"
}
```

---

#### 2. Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive JWT token.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com"
  }
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

#### 3. Get Current User (Protected)

**Endpoint:** `GET /api/auth/me`

**Description:** Get current logged-in user profile.

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "createdAt": "2026-01-31T10:00:00.000Z"
  }
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Not authorized - token required"
}
```

---

### Task Endpoints (Protected)

#### 1. Get All Tasks (Protected)

**Endpoint:** `GET /api/tasks`

**Description:** Retrieve all tasks belonging to the current user, sorted by creation date (newest first).

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /api/tasks HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project documentation",
      "description": "Write comprehensive README",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2026-02-15T00:00:00.000Z",
      "userId": "507f1f77bcf86cd799438888",
      "createdAt": "2026-01-31T10:00:00.000Z",
      "updatedAt": "2026-01-31T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Review pull requests",
      "description": "Check pending PRs",
      "status": "pending",
      "priority": "medium",
      "userId": "507f1f77bcf86cd799438888",
      "createdAt": "2026-01-30T15:30:00.000Z",
      "updatedAt": "2026-01-30T15:30:00.000Z"
    }
  ]
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Not authorized - token required"
}
```

---

#### 2. Get Task by ID (Protected)

**Endpoint:** `GET /api/tasks/:id`

**Description:** Retrieve a single task by its unique ID (must belong to current user).

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the task

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
GET /api/tasks/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-02-15T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799438888",
    "createdAt": "2026-01-31T10:00:00.000Z",
    "updatedAt": "2026-01-31T10:00:00.000Z"
  }
}
```

**Error Response:** `403 Forbidden` (Task belongs to another user)
```json
{
  "success": false,
  "message": "Not authorized to access this task"
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Not authorized - token required"
}
```

---

#### 3. Create New Task (Protected)

**Endpoint:** `POST /api/tasks`

**Description:** Create a new task for the current user.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-02-15"
}
```

**Field Specifications:**

| Field | Type | Required | Validation | Default |
|-------|------|----------|------------|---------|
| `title` | String | Yes | Max 100 chars | - |
| `description` | String | No | Max 500 chars | - |
| `status` | String | No | `pending`, `in-progress`, `completed` | `pending` |
| `priority` | String | No | `low`, `medium`, `high` | `medium` |
| `dueDate` | Date | No | Valid date format | - |

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive README with examples",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-02-15T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799438888",
    "createdAt": "2026-01-31T10:00:00.000Z",
    "updatedAt": "2026-01-31T10:00:00.000Z"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Task validation failed: title: Title is required"
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Not authorized - token required"
}
```

---

#### 4. Update Task (Protected)

**Endpoint:** `PUT /api/tasks/:id`

**Description:** Update an existing task (partial or complete update, must belong to current user).

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the task

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

**Request Body:** (Any combination of fields)
```json
{
  "status": "completed",
  "priority": "low"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive README with examples",
    "status": "completed",
    "priority": "low",
    "dueDate": "2026-02-15T00:00:00.000Z",
    "userId": "507f1f77bcf86cd799438888",
    "createdAt": "2026-01-31T10:00:00.000Z",
    "updatedAt": "2026-01-31T11:00:00.000Z"
  }
}
```

**Error Response:** `403 Forbidden` (Task belongs to another user)
```json
{
  "success": false,
  "message": "Not authorized to update this task"
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Not authorized - token required"
}
```

---

#### 5. Delete Task (Protected)

**Endpoint:** `DELETE /api/tasks/:id`

**Description:** Permanently delete a task (must belong to current user).

**Parameters:**
- `id` (path parameter) - MongoDB ObjectId of the task

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request:**
```http
DELETE /api/tasks/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {},
  "message": "Task deleted successfully"
}
```

**Error Response:** `403 Forbidden` (Task belongs to another user)
```json
{
  "success": false,
  "message": "Not authorized to delete this task"
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "success": false,
  "message": "Not authorized - token required"
}
```

---

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Token missing, invalid, or expired |
| 403 | Forbidden - User not authorized to access resource |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server-side error |

---

## 🖥️ Frontend Usage

### Getting Started

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Expected output: `Server is running on port 5000`

2. **Open Frontend**
   ```bash
   # Using Python
   cd frontend
   python -m http.server 8000
   ```
   Then open: http://localhost:8000/login.html

### User Authentication Flow

1. **Register New Account**
   - Open `login.html`
   - Click "Register here" link
   - Fill in email and password (min 6 chars)
   - Confirm password
   - Submit → Auto-logged in, redirected to task manager

2. **Login to Existing Account**
   - Open `login.html`
   - Enter email and password
   - Click "Login" → Redirected to task manager

3. **View Your Tasks**
   - See your email in header
   - Tasks are filtered to show only yours
   - Other users cannot see your tasks

4. **Logout**
   - Click "Logout" button in header
   - Token cleared, redirected to login page

### Task Management Features

1. **Create Tasks**
   - Fill in the form (title is required)
   - Select status and priority
   - Click "Add Task"
   - Task assigned to current user

2. **View Your Tasks**
   - All your tasks displayed in card format
   - Color-coded borders by status
   - Shows creation and due dates
   - Only you see your tasks

3. **Filter Tasks**
   - Click filter buttons (All, Pending, In Progress, Completed)
   - View counts update automatically
   - Filter applied only to your tasks

4. **Update Task Status**
   - Use dropdown in each task card
   - Changes save automatically
   - Only task owner can update

5. **Delete Tasks**
   - Click "Delete" button
   - Confirm deletion in popup
   - Only task owner can delete

---

## 🚨 Error Handling

### Application-Level Errors

The application handles various error scenarios:

#### Authentication Errors (401/400)
- Missing JWT token
- Invalid or expired token
- Invalid email format
- Duplicate email on registration
- Password too short
- Invalid login credentials

#### Authorization Errors (403)
- Accessing another user's tasks
- Updating/deleting another user's tasks
- Modifying another user's account

#### Validation Errors (400)
- Missing required fields
- Invalid data types
- Exceeding character limits
- Invalid enum values

#### Not Found Errors (404)
- Task ID doesn't exist
- User ID doesn't exist
- Invalid route

#### Database Errors (500)
- MongoDB connection issues
- Query execution failures
- Unique constraint violations

### Error Response Format

All errors return a consistent JSON structure:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": {} // Detailed error object (development only)
}
```

### Frontend Error Handling

- **401 Errors**: User redirected to login page
- **403 Errors**: Operation denied, user stays on current page
- Network errors show alert messages
- Server unavailable warnings
- Failed operations trigger notifications
- All errors logged to console
- Session auto-expires and clears on 401

---

## 🧪 Testing

### Quick Start Testing (5 minutes)

1. **Register**
   - Open http://localhost:8000/login.html
   - Click "Register here"
   - Email: `test@example.com`, Password: `password123`
   - Confirm password, click "Register"
   - Should see task manager with email in header

2. **Create Task**
   - Title: "Test Task"
   - Status: "Pending"
   - Click "Add Task"
   - Should appear in task list

3. **Update Status**
   - Click dropdown on task
   - Change to "In Progress"
   - Should update immediately

4. **Test User Isolation**
   - Open new incognito window
   - Register: `test2@example.com`, Password: `password123`
   - Should NOT see first user's tasks
   - Create your own task
   - Switch back to first user - only their tasks visible

5. **Test Logout**
   - Click "Logout"
   - Should redirect to login page
   - localStorage should be empty

### Manual API Testing with cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Login user (copy token from response)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Create a task (replace TOKEN with JWT from login)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test Task","status":"pending"}'

# Get all tasks
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"

# Update task (replace TASK_ID with actual ID)
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"status":"completed"}'

# Delete task
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer TOKEN"
```

---

## 🌐 Deployment

### Prerequisites for Deployment

Before deploying, you'll need accounts on:
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Free cloud MongoDB
- **[Render](https://render.com/)** - Backend hosting
- **[Vercel](https://vercel.com/)** - Frontend hosting
- **[GitHub](https://github.com/)** - For deploying from repository

---

### Step 1: Set Up MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up and create a free account
   - Create a new project (e.g., "task-manager")

2. **Create a Cluster**
   - Click "Create a Deployment"
   - Choose "Free Shared" tier
   - Select your region
   - Create cluster (wait 3-5 minutes)

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `task_manager_user`
   - Password: Generate a strong password
   - Add user

4. **Get Connection String**
   - Go to "Databases" → "Connect"
   - Click "Drivers"
   - Copy the MongoDB URI
   - Format: `mongodb+srv://<username>:<password>@cluster.mongodb.net/task_manager?retryWrites=true&w=majority`
   - Replace `<username>` and `<password>` with your credentials
   - **Save this URI** - you'll need it for Render

5. **Allow Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - In production, restrict to Render's IP

---

### Step 2: Deploy Backend on Render

1. **Push Backend to GitHub**
   ```bash
   cd global\ trend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to [Render](https://render.com/)
   - Sign up with GitHub
   - Grant repository access

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `task-manager` repository
   - Choose the correct branch: `main`

4. **Configure Web Service**
   ```
   Name: task-manager-api
   Environment: Node
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   Region: Select closest to you
   Plan: Free (for testing)
   ```

5. **Add Environment Variables**
   - Click "Environment" section
   - Add the following variables:
   
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://task_manager_user:YOUR_PASSWORD@cluster.mongodb.net/task_manager?retryWrites=true&w=majority
   JWT_SECRET=<paste random 32-char string>
   JWT_EXPIRE=7d
   ```

   **To generate JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. **Configure CORS for Frontend**
   - After deployment, you'll get a URL like: `https://task-manager-api.onrender.com`
   - Update `backend/src/app.js` CORS configuration:
   
   ```javascript
   const corsOptions = {
     origin: [
       'http://localhost:8000',
       'https://your-frontend-vercel-url.vercel.app'
     ],
     credentials: true
   };
   app.use(cors(corsOptions));
   ```
   
   - Push this change to GitHub, Render will auto-redeploy

7. **Deploy**
   - Render will automatically deploy when you push to GitHub
   - Monitor progress in the "Logs" tab
   - Once deployed, test the API:
   
   ```bash
   curl https://task-manager-api.onrender.com/
   ```

---

### Step 3: Deploy Frontend on Vercel

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub
   - Grant repository access

2. **Create New Project**
   - Click "Add New..." → "Project"
   - Select your `task-manager` repository
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Other (for static files)
   Build Command: (leave empty)
   Output Directory: frontend
   Root Directory: (leave empty)
   ```

4. **Environment Variables**
   - Add variable for your backend URL:
   
   ```
   VITE_API_URL=https://task-manager-api.onrender.com/api
   ```
   
   > Note: This will be used by frontend if you update app.js to use environment variable

5. **Update Frontend for Production API**
   
   Open `frontend/js/app.js` and update the API URL:
   
   ```javascript
   // At the top of the file, add:
   const API_BASE_URL = 'https://task-manager-api.onrender.com/api';
   
   // Then update all fetch calls to use this URL
   // Example:
   fetch(`${API_BASE_URL}/auth/register`, {
     method: 'POST',
     ...
   })
   ```

6. **Push Changes to GitHub**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin main
   ```

7. **Deploy**
   - Vercel will automatically deploy
   - Monitor progress in the Vercel dashboard
   - You'll get a URL like: `https://task-manager-xxxxx.vercel.app`

---

### Step 4: Connect Frontend to Backend

1. **Update Frontend API URL**
   - Replace `API_BASE_URL` in `frontend/js/app.js` with your Render backend URL
   - Redeploy to Vercel

2. **Test the Connection**
   - Open your Vercel frontend URL
   - Click "Register"
   - Try creating an account
   - If successful, your app is connected! 🎉

---

### Environment Variables Checklist

**Render Backend:**
| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | `production` | production |
| `PORT` | `5000` | 5000 |
| `MONGODB_URI` | MongoDB Atlas URI | `mongodb+srv://user:pass@cluster.mongodb.net/task_manager...` |
| `JWT_SECRET` | 32-char random string | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` |
| `JWT_EXPIRE` | `7d` | 7d |

**Vercel Frontend:**
| Variable | Value | Example |
|----------|-------|---------|
| `VITE_API_URL` | Render backend URL | `https://task-manager-api.onrender.com/api` |

---

### Monitoring and Troubleshooting

**Check Backend Logs (Render)**
- Go to your service → "Logs"
- Look for errors in real-time

**Check Frontend Logs (Vercel)**
- Go to your project → "Analytics"
- Check browser console for errors

**Common Issues**

| Issue | Solution |
|-------|----------|
| CORS errors | Update CORS origins in `backend/src/app.js` |
| 401 Unauthorized | Ensure JWT_SECRET is the same on backend |
| MongoDB connection failed | Check MONGODB_URI and IP whitelist in Atlas |
| Frontend can't reach backend | Verify API_BASE_URL in frontend/js/app.js |
| Tasks not loading | Check user is logged in and token is valid |

**Test API Endpoints**
```bash
# Test backend is running
curl https://task-manager-api.onrender.com/

# Test registration
curl -X POST https://task-manager-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test login
curl -X POST https://task-manager-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

### Post-Deployment Security

**Production Checklist:**
- ✅ Change MongoDB password from weak development password
- ✅ Restrict MongoDB IP whitelist to Render IP only
- ✅ Use strong, unique JWT_SECRET
- ✅ Enable HTTPS (automatic on Render & Vercel)
- ✅ Configure CORS to specific domains only
- ✅ Set NODE_ENV to production
- ✅ Consider implementing rate limiting
- ✅ Enable MongoDB backups
- ✅ Set up error logging/monitoring
- ✅ Monitor Render & Vercel for service health

---

### Keep Your App Running

**Render Free Tier Notes:**
- Services sleep after 15 mins of inactivity
- First request after sleep takes 30 seconds
- Upgrade to paid plan to avoid spinning down

**Solution:**
- Upgrade to Starter plan ($7/month)
- Or use a monitoring service to ping every 14 minutes

---

### Backend Deployment (Heroku)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_random_secret_key
   heroku config:set JWT_EXPIRE=7d
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [error handling](#error-handling) section
2. Review the [API documentation](#api-documentation)
3. Open an issue on GitHub

---

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the robust database
- Node.js community for continuous support

---

<div align="center">

**Made with ❤️ by developers, for developers**

[⬆ Back to Top](#task-manager---full-stack-application)

</div>
