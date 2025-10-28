# Frontend Architecture Guide

## 🏗️ **Architecture Overview**

```
frontend/
├── src/
│   ├── context/              # Global state management
│   │   └── AuthContext.jsx       # Authentication state (login, logout, user)
│   │
│   ├── services/             # API communication layer
│   │   └── api.js                # Centralized API calls and configuration
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useApi.js             # Hooks for API calls (useFetch, useApi)
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx            # Navigation with auth state
│   │   ├── Navbar.css            # Navbar styles
│   │   └── ProtectedRoute.jsx    # Route wrapper for auth
│   │
│   ├── pages/                # Page components (routes)
│   │   ├── Login.jsx             # Login page
│   │   ├── Signup.jsx            # Signup page
│   │   └── Auth.css              # Auth page styles
│   │
│   ├── HomePage/             # Home page module
│   │   ├── HomePage.jsx          # Main home page component
│   │   ├── HomePage.css          # Home page styles
│   │   ├── Title.jsx             # Title component
│   │   └── AboutUs.jsx           # About section
│   │
│   ├── examples/             # Example components (for reference)
│   │   ├── CatalogList.jsx       # Example: fetch data on mount
│   │   └── CreateItemForm.jsx    # Example: API call on user action
│   │
│   ├── assets/               # Static assets
│   │   └── MainMenuPic.png       # Images, icons, etc.
│   │
│   ├── App.jsx               # Main app with routing setup
│   └── main.jsx              # React app entry point
│
├── public/                   # Public static files
│   └── vite.svg              # Favicon and public assets
│
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── ARCHITECTURE.md           # This file - architecture documentation
```

---

## 📂 **Folder Structure Explained**

### **Core Folders:**

- **`context/`** - React Context providers for global state
  - Only for truly global state (auth, theme, etc.)
  - Currently: AuthContext for authentication
- **`services/`** - API communication layer
  - Centralized API calls and configuration
  - No UI components, just business logic
- **`hooks/`** - Custom React hooks
  - Reusable logic (API calls, form handling, etc.)
  - Follow naming: `use*` (e.g., `useApi`, `useFetch`)
- **`components/`** - Reusable UI components
  - Used across multiple pages
  - Examples: Navbar, ProtectedRoute, Modal, Button
- **`pages/`** - Page-level components (one per route)
  - Correspond to routes in React Router
  - Can have their own styles (e.g., Auth.css)
- **`HomePage/`** - Feature-specific folder
  - Groups related components together
  - Alternative to putting everything in `pages/`
- **`examples/`** - Example/reference components
  - For learning and reference
  - Can be deleted in production
- **`assets/`** - Static files (images, fonts, etc.)

### **Why This Structure?**

✅ **Separation of Concerns** - Each folder has a specific purpose
✅ **Scalable** - Easy to add new features
✅ **Maintainable** - Clear where to find things
✅ **Modular** - Components can be reused easily

---

## 🔄 **How React Router Fits In**

### **Current Routing Setup:**

```jsx
<Router>
  {" "}
  // 1. Wrap entire app
  <AuthProvider>
    {" "}
    // 2. Provide auth state to all routes
    <Navbar /> // 3. Navbar appears on all pages
    <Routes>
      <Route path="/login" element={<Login />} /> // Public
      <Route path="/signup" element={<Signup />} /> // Public
      <Route
        path="/"
        element={
          // Protected
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </AuthProvider>
</Router>
```

### **Adding More Routes:**

```jsx
// In App.jsx
<Routes>
  {/* Public Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/about" element={<AboutPage />} />

  {/* Protected Routes */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/catalog"
    element={
      <ProtectedRoute>
        <CatalogPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    }
  />

  {/* 404 Not Found */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 🔌 **API Setup - Three Approaches**

### **Approach 1: Direct API Calls (Simple)**

```jsx
// In any component
import { catalogAPI } from "../services/api";

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    catalogAPI.getAllItems().then(setData);
  }, []);

  return <div>{data?.items?.length} items</div>;
};
```

**Pros:** Simple, straightforward
**Cons:** Repetitive, no loading/error handling

---

### **Approach 2: Custom Hooks (RECOMMENDED)**

```jsx
// In any component
import { useFetch } from "../hooks/useApi";
import { catalogAPI } from "../services/api";

const MyComponent = () => {
  const { data, loading, error } = useFetch(() => catalogAPI.getAllItems());

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{data?.items?.length} items</div>;
};
```

**Pros:** Clean, reusable, handles loading/error
**Cons:** None really!

---

### **Approach 3: Create a Context (For Complex Global State)**

**Only use this if:**

- You need to share the SAME data across many components
- Data needs to be cached globally
- You want to avoid prop drilling

```jsx
// Create CatalogContext.jsx
export const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await catalogAPI.getAllItems();
    setItems(data.items);
  };

  return (
    <CatalogContext.Provider value={{ items, loadItems }}>
      {children}
    </CatalogContext.Provider>
  );
};

// Use in components
const { items } = useContext(CatalogContext);
```

**When to use:** Shopping cart, global notifications, shared catalog data
**When NOT to use:** Component-specific data

---

## 📖 **Recommended Pattern**

### **Use Contexts For:**

1. ✅ **Authentication** (AuthContext - already done!)
2. ✅ **Theme** (dark/light mode)
3. ✅ **Shopping Cart** (if building e-commerce)
4. ✅ **Notifications/Toast** (global messages)

### **Use Custom Hooks + API Service For:**

1. ✅ **CRUD operations** (Create, Read, Update, Delete)
2. ✅ **Fetching page-specific data**
3. ✅ **Form submissions**
4. ✅ **Search queries**

---

## 💡 **Example: Building a Catalog Feature**

### **Step 1: Add Backend Route**

```js
// backend/routes/catalog.js
router.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json({ items });
});
```

### **Step 2: Add to API Service**

```js
// frontend/src/services/api.js
export const catalogAPI = {
  getAllItems: () => api.get("/catalog/items"),
};
```

### **Step 3: Use in Component**

```jsx
// frontend/src/pages/CatalogPage.jsx
import { useFetch } from "../hooks/useApi";
import { catalogAPI } from "../services/api";

const CatalogPage = () => {
  const { data, loading, error } = useFetch(() => catalogAPI.getAllItems());

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Catalog</h1>
      {data?.items?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

### **Step 4: Add Route**

```jsx
// App.jsx
<Route
  path="/catalog"
  element={
    <ProtectedRoute>
      <CatalogPage />
    </ProtectedRoute>
  }
/>
```

---

## 🎯 **Summary**

### **Your Current Setup (Perfect!):**

```
AuthContext → Manages login/logout/user state
API Service → Centralized API configuration
Custom Hooks → Reusable API call logic
React Router → Navigation and protected routes
```

### **Do NOT create a general API Context**

- Use `AuthContext` for authentication only ✅
- Use `api.js` service for all API calls ✅
- Use `useApi` hooks for components ✅
- Only create new contexts for other global state (theme, cart, etc.)

---

## 🚀 **Quick Reference**

```jsx
// ✅ For fetching data on mount
const { data, loading, error } = useFetch(() => api.get("/endpoint"));

// ✅ For user-triggered actions
const { execute, loading } = useApi(api.post);
await execute("/endpoint", { data });

// ✅ For authentication
const { user, login, logout } = useAuth();

// ✅ For navigation
const navigate = useNavigate();
navigate("/dashboard");

// ✅ For protecting routes
<Route
  path="/private"
  element={
    <ProtectedRoute>
      <PrivatePage />
    </ProtectedRoute>
  }
/>;
```

---

## 📚 **Need Help?**

See the example components in `src/examples/`:

- `CatalogList.jsx` - Fetch data on mount
- `CreateItemForm.jsx` - API call on form submit

Good luck building! 🎉
