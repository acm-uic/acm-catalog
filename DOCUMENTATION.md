# 📚 Documentation Index

This file provides quick links to all documentation in the ACM Catalog project.

## 📖 Main Documentation

### **Project Overview**

- [Main README](./README.md) - Complete project overview and quick start guide

### **Backend Documentation**

- [Backend README](./backend/README.md) - Backend setup, API endpoints, and MongoDB configuration
  - Installation instructions (MongoDB, dependencies)
  - Environment configuration
  - API endpoint documentation
  - Security features
  - Troubleshooting guide

### **Frontend Documentation**

- [Frontend README](./frontend/README.md) - Frontend setup and usage guide
  - Quick start instructions
  - Available scripts
  - Usage examples
  - Troubleshooting
- [Frontend Architecture Guide](./frontend/ARCHITECTURE.md) - Detailed architecture explanation
  - Folder structure
  - React Router setup
  - API integration patterns
  - Context usage guidelines
  - Custom hooks
  - Best practices
- [Style Guide](./frontend/STYLES.md) - Design system and styling standards ⭐ NEW!
  - Color palette
  - Typography (Londrina Solid font)
  - Spacing system
  - Component styles
  - Responsive design
  - CSS naming conventions
  - Examples and checklist

---

## 🗂️ Quick Reference

### **File Structure**

```
acm-catalog/
├── backend/              # Express + MongoDB server
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── README.md        # Backend docs
│
└── frontend/            # React + Vite app
    ├── src/
    │   ├── context/     # Global state (AuthContext)
    │   ├── services/    # API layer
    │   ├── hooks/       # Custom hooks
    │   ├── components/  # Reusable UI
    │   ├── pages/       # Page components
    │   ├── HomePage/    # Home page module
    │   ├── examples/    # Example components
    │   └── assets/      # Images, etc.
    ├── README.md        # Frontend docs
    ├── ARCHITECTURE.md  # Architecture guide
    └── STYLES.md        # Style guide (NEW!)
```

---

## 🚀 Getting Started

### **For New Developers:**

1. Read [Main README](./README.md) for project overview
2. Follow [Backend README](./backend/README.md) to set up MongoDB and backend
3. Follow [Frontend README](./frontend/README.md) to set up React app
4. Read [Architecture Guide](./frontend/ARCHITECTURE.md) to understand the codebase
5. Review [Style Guide](./frontend/STYLES.md) before creating components

### **For Existing Team Members:**

- **Adding new features?** → Check [Architecture Guide](./frontend/ARCHITECTURE.md)
- **Creating new components?** → Follow [Style Guide](./frontend/STYLES.md)
- **Backend API changes?** → Update [Backend README](./backend/README.md)
- **Frontend changes?** → Keep this structure in mind

---

## 🔐 Authentication Flow

```
1. User visits app → Redirected to /login (if not authenticated)
2. User signs up/logs in → JWT token generated
3. Token stored in localStorage + HTTP-only cookie
4. Protected routes check token → Access granted/denied
5. User logs out → Token cleared
```

**Documentation:**

- Backend auth: [backend/README.md](./backend/README.md#authentication-api-endpoints)
- Frontend auth: [frontend/ARCHITECTURE.md](./frontend/ARCHITECTURE.md#using-authentication)

---

## 🛠️ Development Workflow

### **Starting Development:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - MongoDB (if not running as service)
sudo systemctl start mongod
```

### **Creating a New Feature:**

1. Create feature branch: `git checkout -b feature/your-feature`
2. Backend: Add routes in `backend/routes/`
3. Frontend: Add API call in `frontend/src/services/api.js`
4. Frontend: Create component/page
5. Test thoroughly
6. Update relevant documentation
7. Create pull request

---

## 📝 Documentation Standards

When adding new features, update:

- [ ] Main README if it affects overall setup
- [ ] Backend README for new API endpoints
- [ ] Frontend README for new components/pages
- [ ] ARCHITECTURE.md for architectural changes
- [ ] This index if new docs are added

---

## 🤝 Contributing

See [Main README](./README.md#contributing) for contribution guidelines.

---

## 📧 Support

For questions or issues:

- Check relevant documentation above
- Review example components in `frontend/src/examples/`
- Contact ACM UIC development team

---

**Last Updated:** October 28, 2025
