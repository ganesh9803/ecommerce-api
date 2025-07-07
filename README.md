# 🛍️ Simple E-commerce App (MERN + Vite + Tailwind)

A full-stack E-commerce web application with authentication, product management, cart, and orders — built with:

- **Backend**: Node.js, Express, MongoDB, JWT
- **Frontend**: React, Vite, Tailwind CSS
- **Auth**: Role-based (Admin / Customer)

---

## 🚀 Features

### 🔐 Authentication & Roles
- JWT-based login & registration
- Roles: `admin`, `customer`
- Role-based route protection

### 🛒 Customer Features
- View product list
- Add products to cart
- Place orders
- View order history

### 🛠️ Admin Features
- Add, update, delete products
- View all orders from all users

---

## 📦 Tech Stack

| Layer       | Tech                     |
|-------------|--------------------------|
| Frontend    | React + Vite + Tailwind  |
| Backend     | Node.js + Express        |
| Database    | MongoDB + Mongoose       |
| Auth        | JWT (JSON Web Tokens)    |

---

## 📁 Project Structure

server/ # Express backend (ESModules)
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/db.js
├── server.js
└── .env

client/ # Vite + React frontend
├── src/
│ ├── components/
│ ├── pages/
│ └── App.jsx
└── vite.config.js

