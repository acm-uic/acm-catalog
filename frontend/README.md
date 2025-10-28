# ACM Catalog Frontend

React + Vite application with authentication and modern architecture.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm
- Backend server running on `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── context/              # Global state management
│   └── AuthContext.jsx       # Authentication state
│
├── services/             # API communication
│   └── api.js                # Centralized API calls
│
├── hooks/                # Custom React hooks
│   └── useApi.js             # API hooks (useFetch, useApi)
│
├── components/           # Reusable UI components
│   ├── Navbar.jsx            # Navigation
│   ├── Navbar.css            # Navbar styles
│   └── ProtectedRoute.jsx    # Route protection
│
├── pages/                # Page components
│   ├── Login.jsx             # Login page
│   ├── Signup.jsx            # Signup page
│   └── Auth.css              # Auth styles
│
├── HomePage/             # Home page module
│   ├── HomePage.jsx          # Main component
│   ├── HomePage.css          # Styles
│   ├── Title.jsx             # Title section
│   └── AboutUs.jsx           # About section
│
├── examples/             # Example components
│   ├── CatalogList.jsx       # Data fetching example
│   └── CreateItemForm.jsx    # Form submission example
│
├── assets/               # Static assets
│   └── MainMenuPic.png       # Images
│
├── App.jsx               # Main app with routing
└── main.jsx              # Entry point
```

**📖 For detailed architecture explanation, see [ARCHITECTURE.md](./ARCHITECTURE.md)**

---

## 🛠️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🔑 Environment Variables

Create or update `.env` file:

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

---

## 🏗️ Key Features

### **Authentication System**

- ✅ Login & Signup forms with validation
- ✅ JWT token management
- ✅ Auto-login on page refresh
- ✅ Protected routes
- ✅ Logout functionality

### **Routing**

- ✅ React Router setup
- ✅ Public routes: `/login`, `/signup`
- ✅ Protected routes: `/` (HomePage)
- ✅ Automatic redirect to login if not authenticated

### **API Integration**

- ✅ Centralized API service (`services/api.js`)
- ✅ Custom hooks for API calls (`hooks/useApi.js`)
- ✅ Automatic auth header injection
- ✅ Error handling
- ✅ Loading states

---

## 📖 Usage Examples

### **Using Authentication**

```jsx
import { useAuth } from "./context/AuthContext";

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### **Fetching Data (Auto on Mount)**

```jsx
import { useFetch } from "./hooks/useApi";
import { catalogAPI } from "./services/api";

function CatalogPage() {
  const { data, loading, error, refetch } = useFetch(() =>
    catalogAPI.getAllItems()
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {data?.items?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### **Making API Calls (User Actions)**

```jsx
import { useApi } from "./hooks/useApi";
import { catalogAPI } from "./services/api";

function CreateForm() {
  const { execute, loading, error } = useApi(catalogAPI.createItem);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await execute({ name: "New Item", description: "..." });
      alert("Success!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loading}>{loading ? "Creating..." : "Create"}</button>
    </form>
  );
}
```

### **Adding Protected Routes**

```jsx
// In App.jsx
import ProtectedRoute from "./components/ProtectedRoute";
import NewPage from "./pages/NewPage";

<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>;
```

---

## 🎨 Styling

- CSS Modules per component/page
- Modern gradient backgrounds
- Responsive design
- Mobile-friendly

---

## 🔒 Security

- JWT tokens stored in localStorage
- HTTP-only cookies for additional security
- Protected routes redirect to login
- Auth headers automatically added to API requests
- Password validation on frontend and backend

---

## 📚 Additional Resources

- **Architecture Guide**: [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture explanation
- **React Router Docs**: [reactrouter.com](https://reactrouter.com)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **Backend API**: See [../backend/README.md](../backend/README.md)

---

## 🐛 Troubleshooting

### **CORS Errors**

Make sure backend CORS is configured:

```js
// backend/server.js
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
```

### **API Connection Failed**

1. Check backend is running on port 3000
2. Verify `VITE_API_URL` in `.env`
3. Check browser console for errors

### **Not Authenticated After Login**

1. Clear browser localStorage
2. Check backend JWT_SECRET is set
3. Verify token is being stored: `localStorage.getItem('token')`

---

## 🤝 Contributing

See main [README.md](../README.md) for contributing guidelines.

---

## 📝 License

This project is maintained by ACM UIC.
