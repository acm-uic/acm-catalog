# ACM Catalog

A full-stack web application for managing the ACM catalog with MongoDB authentication.

## 📁 Complete Project Structure

```
acm-catalog/
├── backend/                      # Express.js + MongoDB authentication server
│   ├── config/
│   │   └── db.js                # MongoDB connection configuration
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   └── User.js              # User schema with password hashing
│   ├── routes/
│   │   └── auth.js              # Authentication endpoints
│   ├── .env.local               # Environment variables (not committed)
│   ├── package.json             # Backend dependencies
│   ├── server.js                # Main server entry point
│   └── README.md                # Backend setup documentation
│
└── frontend/                     # React + Vite frontend
    ├── src/
    │   ├── context/             # Global state management
    │   │   └── AuthContext.jsx  # Authentication state
    │   ├── services/            # API communication
    │   │   └── api.js           # API service layer
    │   ├── hooks/               # Custom React hooks
    │   │   └── useApi.js        # API hooks (useFetch, useApi)
    │   ├── components/          # Reusable UI components
    │   │   ├── Navbar.jsx       # Navigation component
    │   │   ├── Navbar.css       # Navbar styles
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── pages/               # Page components
    │   │   ├── Login.jsx        # Login page
    │   │   ├── Signup.jsx       # Signup page
    │   │   └── Auth.css         # Auth pages styling
    │   ├── HomePage/            # Home page module
    │   │   ├── HomePage.jsx     # Main home component
    │   │   ├── HomePage.css     # Home page styles
    │   │   ├── Title.jsx        # Title component
    │   │   └── AboutUs.jsx      # About section
    │   ├── examples/            # Example components (reference)
    │   │   ├── CatalogList.jsx  # Example: data fetching
    │   │   └── CreateItemForm.jsx # Example: form submission
    │   ├── assets/              # Static assets
    │   │   └── MainMenuPic.png  # Images, icons
    │   ├── App.jsx              # Main app with routing
    │   └── main.jsx             # React entry point
    ├── public/                  # Public static files
    ├── .env                     # Frontend environment variables
    ├── package.json             # Frontend dependencies
    ├── vite.config.js           # Vite configuration
    ├── ARCHITECTURE.md          # Frontend architecture guide
    └── README.md                # Frontend setup instructions
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16+)
- **npm**
- **MongoDB** (v8.0+)

### Backend Setup

```bash
cd backend
npm install

# Setup MongoDB (see backend/README.md for detailed instructions)
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Configure environment variables
# Edit .env.local with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

**📖 See [backend/README.md](./backend/README.md) for complete backend setup instructions**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**📖 See [frontend/README.md](./frontend/README.md) and [frontend/ARCHITECTURE.md](./frontend/ARCHITECTURE.md) for detailed information**

---

## 🔐 Authentication Features

- ✅ User signup with email/password validation
- ✅ Secure login with JWT tokens (30-day expiration)
- ✅ Password hashing with bcryptjs
- ✅ HTTP-only cookie authentication
- ✅ Protected routes (frontend & backend)
- ✅ Auto-login on page refresh
- ✅ Logout functionality

---

## 🏗️ Architecture

### **Backend Stack:**

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Token authentication
- bcryptjs - Password hashing

### **Frontend Stack:**

- React 19 - UI library
- Vite - Build tool
- React Router - Routing
- Context API - State management
- Custom hooks - Reusable logic

---

## 📚 Documentation

- **Backend API**: [backend/README.md](./backend/README.md) - Complete API documentation
- **Frontend Setup**: [frontend/README.md](./frontend/README.md) - Setup instructions
- **Frontend Architecture**: [frontend/ARCHITECTURE.md](./frontend/ARCHITECTURE.md) - Architecture guide
- **Style Guide**: [frontend/STYLES.md](./frontend/STYLES.md) - Design system and styling standards
- **Documentation Index**: [DOCUMENTATION.md](./DOCUMENTATION.md) - Complete documentation index

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Submit a pull request to the main repository

---

## 📝 License

This project is maintained by ACM UIC.
