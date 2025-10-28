# 🎨 Style Guide & Design System

**ACM Catalog Design Standards**

This document ensures visual consistency across the application and helps new developers understand our styling approach.

---

## 📐 Design Principles

1. **Consistency** - Use the same colors, fonts, and spacing throughout
2. **Clarity** - Clean, readable code with descriptive class names
3. **Responsiveness** - Mobile-first, works on all screen sizes
4. **Accessibility** - Good contrast, readable text sizes

---

## 🎨 Color Palette

### **Primary Colors**

```css
/* Main Brand Gradient */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Individual Colors */
--purple-light: #667eea; /* Light purple/blue */
--purple-dark: #764ba2; /* Dark purple */
```

### **Neutral Colors**

```css
--white: #ffffff;
--gray-50: #f5f5f5; /* Very light gray - disabled backgrounds */
--gray-200: #e1e8ed; /* Light gray - borders */
--gray-400: #999999; /* Medium gray - placeholders */
--gray-600: #666666; /* Dark gray - secondary text */
--gray-900: #333333; /* Almost black - primary text */
```

### **Semantic Colors**

```css
/* Success */
--success-bg: #e8f5e9; /* Light green background */
--success-border: #81c784; /* Green border */
--success-text: #2e7d32; /* Dark green text */

/* Error */
--error-bg: #ffeeee; /* Light red background */
--error-border: #ffcccc; /* Red border */
--error-text: #cc3333; /* Dark red text */

/* Warning */
--warning-bg: #fff8e1; /* Light yellow background */
--warning-border: #ffb74d; /* Orange border */
--warning-text: #f57c00; /* Dark orange text */
```

### **How to Use Colors**

```css
/* Example: Auth card */
.auth-card {
  background: var(--white);
  color: var(--gray-900);
}

/* Example: Button */
.auth-button {
  background: var(--gradient-primary);
  color: var(--white);
}

/* Example: Error message */
.error-message {
  background-color: var(--error-bg);
  border: 1px solid var(--error-border);
  color: var(--error-text);
}
```

---

## 🔤 Typography

### **Font Family**

```css
/* Primary Font - Used everywhere */
font-family: "Londrina Solid", cursive;
```

**All text uses Londrina Solid** - no exceptions for consistency!

### **Font Weights**

```css
--font-thin: 100; /* Rarely used */
--font-light: 300; /* Subtle text, captions */
--font-regular: 400; /* Body text, default */
--font-black: 900; /* Heavy emphasis, big headings */
```

### **Font Sizes**

```css
/* Headings */
--text-4xl: 28px; /* Page titles (h2) */
--text-3xl: 24px; /* Section headings */
--text-2xl: 20px; /* Sub-headings */
--text-xl: 18px; /* Large text */

/* Body */
--text-lg: 16px; /* Large body text */
--text-base: 15px; /* Default body text */
--text-sm: 14px; /* Small text, labels */
--text-xs: 12px; /* Very small text, captions */
```

### **Typography Examples**

```css
/* Page Title */
h2 {
  font-size: 28px;
  font-weight: 400;
  color: #333;
}

/* Body Text */
p {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
}

/* Small Text */
.auth-subtitle {
  font-size: 14px;
  color: #666;
}

/* Button Text */
button {
  font-size: 16px;
  font-weight: 600;
}
```

---

## 📏 Spacing System

Use consistent spacing for margins and padding. Based on 4px increments.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### **Common Spacing Patterns**

```css
/* Small gap between related items */
gap: 8px; /* or 12px */

/* Form field spacing */
.form-group {
  gap: 8px; /* Label to input */
  margin-bottom: 20px; /* Between form fields */
}

/* Card padding */
.card {
  padding: 40px; /* Desktop */
  padding: 20px; /* Mobile */
}

/* Section spacing */
margin-bottom: 30px; /* Between sections */
```

---

## 🎯 Border Radius

Consistent rounded corners throughout the app.

```css
--radius-sm: 6px; /* Small elements (tags, badges) */
--radius-md: 8px; /* Default (buttons, inputs, cards) */
--radius-lg: 12px; /* Large elements (modals, containers) */
--radius-full: 50%; /* Circles (avatars, icon buttons) */
```

### **Examples**

```css
/* Button */
border-radius: 8px;

/* Card */
border-radius: 12px;

/* Input */
border-radius: 8px;

/* Avatar */
border-radius: 50%;
```

---

## 🌈 Component Styles

### **Buttons**

```css
/* Primary Button (Main actions) */
.button-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.button-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Secondary Button (Less important actions) */
.button-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  /* Same padding, radius, etc. as primary */
}

/* Text Button (Subtle actions) */
.button-text {
  background: transparent;
  color: #667eea;
  border: none;
  padding: 8px 16px;
  text-decoration: underline;
}
```

### **Form Inputs**

```css
/* Text Input */
input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  width: 100%;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

input::placeholder {
  color: #999;
}

/* Form Label */
label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: block;
}
```

### **Cards**

```css
/* Standard Card */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 450px;
}

/* Hover Card (interactive) */
.card-hover {
  /* Same as .card plus: */
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}
```

### **Messages/Alerts**

```css
/* Error Message */
.error-message {
  background-color: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

/* Success Message */
.success-message {
  background-color: #e8f5e9;
  border: 1px solid #81c784;
  color: #2e7d32;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

/* Info Message */
.info-message {
  background-color: #e3f2fd;
  border: 1px solid #90caf9;
  color: #1565c0;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}
```

---

## 🎭 Shadows

Consistent shadow styles for depth and hierarchy.

```css
/* Subtle - For cards at rest */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Medium - For cards and modals */
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

/* Strong - For hover states */
box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);

/* Colored - For buttons */
box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
```

---

## 📱 Responsive Design

### **Breakpoints**

```css
/* Mobile First Approach */

/* Small phones */
@media (max-width: 480px) {
  /* Styles for phones */
}

/* Tablets and small laptops */
@media (max-width: 768px) {
  /* Styles for tablets */
}

/* Desktop */
@media (max-width: 1024px) {
  /* Styles for small desktop */
}
```

### **Common Responsive Patterns**

```css
/* Example: Auth Card */
.auth-card {
  padding: 40px;
  max-width: 450px;
}

@media (max-width: 500px) {
  .auth-card {
    padding: 30px 20px;
  }
}

/* Example: Navbar */
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 600px) {
  .navbar-container {
    flex-direction: column;
    gap: 15px;
  }
}
```

---

## ⚡ Transitions & Animations

Keep animations smooth and consistent.

```css
/* Standard transition */
transition: all 0.3s ease;

/* Button hover */
.button:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Button active (click) */
.button:active {
  transform: translateY(0);
  transition: all 0.1s ease;
}

/* Fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease;
}
```

---

## 📋 CSS Class Naming Conventions

Use clear, descriptive class names.

### **BEM-inspired Naming**

```css
/* Block - Component name */
.navbar {
}

/* Block__Element - Part of component */
.navbar__logo {
}
.navbar__menu {
}
.navbar__button {
}

/* Block--Modifier - Variant of component */
.button--primary {
}
.button--secondary {
}
.button--disabled {
}
```

### **Functional Class Names**

```css
/* State classes */
.is-active {
}
.is-disabled {
}
.is-loading {
}
.is-hidden {
}

/* Layout classes */
.container {
}
.flex-center {
}
.grid-2-col {
}
```

### **Examples from Our App**

```css
/* Good ✅ */
.auth-container {
}
.auth-card {
}
.auth-form {
}
.form-group {
}
.error-message {
}
.navbar-button {
}

/* Avoid ❌ */
.div1 {
}
.box {
}
.thing {
}
.container1 {
}
```

---

## 🎨 Example: Creating a New Component

When creating a new component, follow this pattern:

### **1. Create the Component File**

```jsx
// src/components/NewComponent.jsx
import "./NewComponent.css";

const NewComponent = () => {
  return (
    <div className="new-component">
      <h2 className="new-component__title">Title</h2>
      <p className="new-component__text">Text</p>
      <button className="new-component__button">Click</button>
    </div>
  );
};

export default NewComponent;
```

### **2. Create the CSS File**

```css
/* src/components/NewComponent.css */

/* Container */
.new-component {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

/* Title */
.new-component__title {
  font-size: 28px;
  font-weight: 400;
  color: #333;
  margin-bottom: 20px;
}

/* Text */
.new-component__text {
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 30px;
}

/* Button */
.new-component__button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.new-component__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Responsive */
@media (max-width: 500px) {
  .new-component {
    padding: 20px;
  }

  .new-component__title {
    font-size: 24px;
  }
}
```

---

## ✅ Checklist for New Components

When creating a new component, ensure:

- [ ] Used Londrina Solid font
- [ ] Used brand colors (purple gradient)
- [ ] Consistent spacing (8px, 12px, 20px, 40px)
- [ ] Border radius (8px or 12px)
- [ ] Smooth transitions (0.3s ease)
- [ ] Mobile responsive (test at 400px width)
- [ ] Clear, descriptive class names
- [ ] Hover/active states for interactive elements
- [ ] Disabled states for buttons/inputs
- [ ] Good color contrast for accessibility

---

## 🔍 Quick Reference

### **Most Common Patterns**

```css
/* Card/Container */
background: white;
border-radius: 12px;
padding: 40px;
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

/* Primary Button */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 12px 20px;
border-radius: 8px;
transition: all 0.3s ease;

/* Input Field */
padding: 12px 16px;
border: 2px solid #e1e8ed;
border-radius: 8px;
font-size: 15px;

/* Error Message */
background: #fee;
border: 1px solid #fcc;
color: #c33;
padding: 12px 16px;
border-radius: 8px;
```

---

## 📚 Additional Resources

- **Color Tool**: [coolors.co](https://coolors.co) - Create color palettes
- **Font Preview**: [fonts.google.com](https://fonts.google.com/specimen/Londrina+Solid)
- **Spacing Guide**: Use 4px increments (4, 8, 12, 16, 20, etc.)
- **Shadow Generator**: [shadows.brumm.af](https://shadows.brumm.af)

---

## 🤝 Contributing to Styles

1. **Before adding new styles**, check if a similar pattern exists
2. **Ask yourself**: "Can I reuse an existing component/class?"
3. **Keep it consistent** with the patterns shown here
4. **Test on mobile** before committing
5. **Update this guide** if you create new reusable patterns

---

## 💡 Tips for New Developers

1. **Start with existing components** - Copy patterns from Login.jsx, Signup.jsx, Navbar.jsx
2. **Use browser DevTools** - Inspect existing components to see the CSS
3. **Mobile-first** - Always check how it looks on small screens
4. **Ask for help** - If unsure, check this guide or ask the team

---

**Last Updated:** October 28, 2025

**Questions?** Check out the example components in:

- `src/pages/Login.jsx` & `Auth.css`
- `src/components/Navbar.jsx` & `Navbar.css`
- `src/examples/` folder
