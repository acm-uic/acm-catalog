# 🎨 Quick Style Reference Card

**Copy-paste this for quick access while coding!**

---

## 🎨 Colors

```css
/* Purple Gradient (Primary) */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Text Colors */
color: #333; /* Primary text */
color: #666; /* Secondary text */
color: #999; /* Placeholder text */

/* Borders */
border: 2px solid #e1e8ed; /* Default */
border-color: #667eea; /* Focus */

/* Backgrounds */
background: #ffffff; /* White */
background: #f5f5f5; /* Disabled */
```

---

## 🔤 Typography

```css
/* Font */
font-family: "Londrina Solid", cursive;

/* Sizes */
font-size: 28px; /* Page title */
font-size: 16px; /* Buttons */
font-size: 15px; /* Body text */
font-size: 14px; /* Labels, small text */

/* Weights */
font-weight: 300; /* Light */
font-weight: 400; /* Regular (default) */
font-weight: 600; /* Semi-bold (buttons) */
font-weight: 900; /* Black (big headings) */
```

---

## 📏 Spacing

```css
gap: 8px; /* Small gaps */
gap: 20px; /* Medium gaps */
padding: 12px 16px; /* Inputs */
padding: 40px; /* Cards */
margin-bottom: 20px; /* Between elements */
```

---

## 🎯 Common Patterns

### Button

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 12px 20px;
border: none;
border-radius: 8px;
font-size: 16px;
font-weight: 600;
cursor: pointer;
transition: all 0.3s ease;
```

### Input

```css
padding: 12px 16px;
border: 2px solid #e1e8ed;
border-radius: 8px;
font-size: 15px;
transition: all 0.3s ease;
```

### Card

```css
background: white;
border-radius: 12px;
padding: 40px;
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
```

### Error Message

```css
background: #fee;
border: 1px solid #fcc;
color: #c33;
padding: 12px 16px;
border-radius: 8px;
```

---

## ⚡ Effects

### Hover (Button)

```css
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}
```

### Focus (Input)

```css
input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

### Transition

```css
transition: all 0.3s ease;
```

---

## 📱 Responsive

```css
@media (max-width: 500px) {
  .card {
    padding: 20px;
  }
}
```

---

**See [STYLES.md](./STYLES.md) for complete documentation!**
