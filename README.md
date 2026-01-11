# Namaste Node.js – Tinder Dev

A **full-stack web application** built while learning **Node.js** through **Namaste Node.js by Akshay Saini**.

This project is inspired by a **Tinder-like developer matching platform**, where developers can discover, connect, and interact with each other.

The application includes:
- A **React-based frontend** for user interaction
- A **Node.js + Express backend** for APIs and business logic
- A **MongoDB database** for persistent storage

This project focuses on **real-world full-stack architecture**, clean APIs, authentication, and scalable design

---

## 🧠 What I Learned from This Project



Key learnings:
- How Node.js actually works (event loop, async I/O)
- How Express handles requests and middleware
- Designing REST APIs properly
- Authentication & authorization
- Database schema design
- Writing clean, maintainable backend code

---

## 🛠 Tech Stack

### Frontend
- **React.js** – UI library
- **Vite / CRA** – Build tool
- **Redux / Context API** – State management
- **Axios / Fetch** – API communication
- **CSS / Tailwind** – Styling

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication
- **bcrypt** – Password hashing

### Tools
- **Postman** – API testing
- **Git & GitHub** – Version control

---


---

## 🔐 Authentication Flow

- User registers with email & password
- Password is hashed using **bcrypt**
- JWT token is generated on login
- Protected routes are secured using **JWT middleware**

No shortcuts. This follows real industry standards.

---

## 🧩 Core Features

### 👤 User
- Sign up & login (frontend + backend)
- JWT-based authentication
- View & edit developer profile
- Set and update **age**, bio, and profile image

### 💘 Match System
- Browse developers via **Feed Page**
- Send connection requests
- View incoming & outgoing requests
- Accept / Reject requests
- Prevent duplicate or invalid requests

### 💬 Chat
- One-to-one chat after mutual connection
- Messages persisted in database
- Access restricted to connected users only

### 🔄 Frontend–Backend Integration
- REST API consumption from React
- Centralized auth handling
- Protected routes on both frontend & backend

### 🛡 Security
- Password hashing with bcrypt
- Token-based authentication
- Protected API routes

---

## 🌱 Environment Variables

Create a `.env` file in the **root directory**:

```env
DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

## 📸 Screenshots

## 📸 Application Screenshots

| Step | Feature | Preview |
|-----|--------|--------|
| 1 | **Home Page** | <img src="https://github.com/user-attachments/assets/c1a36573-0911-4edc-81f8-5df2d748d3ad" width="500" /> |
| 2 | **Sign Up** | <img src="https://github.com/user-attachments/assets/00a989d8-6418-4d74-a72f-78293dffcd45" width="500" /> |
| 3 | **Login** | <img src="https://github.com/user-attachments/assets/83ceda68-b216-4755-91e3-510b85dd99be" width="500" /> |
| 4 | **Request Page** | <img src="https://github.com/user-attachments/assets/6997b2b6-bed9-4a4d-a7cb-6e90311efb90" width="500" /> |
| 5 | **Connection Page** | <img src="https://github.com/user-attachments/assets/5ecbe61a-7f7a-4d8c-9431-344fd3fae822" width="500" /> |
| 6 | **Chat Page** | <img src="https://github.com/user-attachments/assets/5c2ef944-3009-48fb-9acc-735f765dafaa" width="500" /> |
| 7 | **Profile Page** | <img src="https://github.com/user-attachments/assets/6f5c5ff2-ec8c-4c7d-9c82-e629c366e1b2" width="500" /> |


---


