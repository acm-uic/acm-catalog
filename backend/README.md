# ACM Catalog Backend

MongoDB-based authentication server with JWT token management for the ACM Catalog application.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v8.0 or higher) - Installation instructions below

---

## 📦 Installation

### 1. Install MongoDB

#### On Ubuntu/Debian Linux:

```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg

# Create MongoDB repository list file
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

#### On macOS:

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify installation
mongosh --eval "db.version()"
```

#### Alternative: MongoDB Atlas (Cloud)

If you prefer not to install MongoDB locally, you can use MongoDB Atlas (free tier available):

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local` with your Atlas connection string

---

### 2. Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install all npm packages
npm install
```

This will install:

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `cookie-parser` - Cookie parsing middleware
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `nodemon` - Development auto-reload

---

### 3. Configure Environment Variables

Create a `.env.local` file in the `backend` directory:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/acm-catalog
JWT_SECRET=your-secret-key-change-this-in-production-use-something-random-and-secure
FRONTEND_URL=http://localhost:5173
```

**Important Security Notes:**

- ⚠️ **Never commit `.env.local` to version control!**
- 🔐 Use a strong, random `JWT_SECRET` in production (32+ characters)
- 🌐 Update `FRONTEND_URL` to match your frontend's URL

---

## 🏃 Running the Server

### Development Mode (with auto-reload):

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the PORT you specified)

### Production Mode:

```bash
node server.js
```

---

## 🔐 Authentication API Endpoints

### Base URL: `http://localhost:3000/api/auth`

### 1. **Signup** - Create a new user account

**POST** `/api/auth/signup`

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-10-27T04:51:42.724Z"
  }
}
```

---

### 2. **Login** - Authenticate existing user

**POST** `/api/auth/login`

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-10-27T04:51:42.724Z"
  }
}
```

---

### 3. **Get Current User** - Get authenticated user's data (Protected)

**GET** `/api/auth/me`

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-10-27T04:51:42.724Z"
  }
}
```

---

### 4. **Logout** - Clear authentication cookie

**POST** `/api/auth/logout`

```bash
curl -X POST http://localhost:3000/api/auth/logout
```

**Response:**

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   └── User.js            # User schema and password hashing
├── routes/
│   └── auth.js            # Authentication routes (signup, login, etc.)
├── .env.local             # Environment variables (DO NOT COMMIT!)
├── .env                   # Environment template (committed)
├── package.json           # Dependencies and scripts
├── server.js              # Main server entry point
└── README.md              # This file
```

---

## 🔒 Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs before storage
2. **JWT Tokens**: Stateless authentication with 30-day expiration
3. **HTTP-only Cookies**: Tokens stored in secure, HTTP-only cookies
4. **CORS Protection**: Configured to only accept requests from frontend
5. **Input Validation**: Email and password validation on User model
6. **No Password Exposure**: Passwords never returned in API responses

---

## 🧪 Testing the API

### Using cURL (Command Line):

```bash
# 1. Create a new user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123", "name": "Test User"}'

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'

# 3. Get current user (replace TOKEN with actual token from login)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman or Insomnia:

1. Import the endpoints above
2. Set headers: `Content-Type: application/json`
3. For protected routes, add `Authorization: Bearer <token>` header

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**: Ensure MongoDB is running:

```bash
sudo systemctl status mongod
# If not running:
sudo systemctl start mongod
```

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**: Change the PORT in `.env.local` or kill the process using port 3000:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process (replace PID with actual process ID)
kill -9 PID
```

### JWT Secret Not Set

**Error**: `JWT_SECRET is not defined`

**Solution**: Ensure `.env.local` exists with a `JWT_SECRET` variable

---

## 📚 Learn More

### Authentication Flow:

1. User signs up → Password hashed → Stored in MongoDB → JWT token generated
2. User logs in → Password verified → JWT token generated
3. Protected routes → JWT verified → Access granted/denied
4. User logs out → Token cleared from cookies

### Key Technologies:

- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing algorithm

---

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📝 License

This project is part of the ACM Catalog application.

---

## 👥 Support

For issues or questions, please contact the ACM development team.
