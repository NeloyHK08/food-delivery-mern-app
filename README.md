# 🍔 Food Delivery MERN App

A full‑stack **Food Delivery Platform** built using the **MERN stack (MongoDB, Express, React, Node.js)**. The application supports **User authentication**, **Food Partner onboarding**, and **food item management**, with a clean API architecture and modern frontend.

This project is designed to demonstrate **real‑world backend + frontend integration**, proper authentication flow, and role‑based usage (Customer & Food Partner).

---

## 🚀 Features

### 👤 User (Customer)

* User registration & login
* Secure authentication with hashed passwords
* Cookie‑based session handling
* Browse available food items

### 🧑‍🍳 Food Partner

* Food partner registration & login
* Add, view, and manage food items
* Partner‑specific food listing

### 🔐 Authentication

* Separate auth flows for users and food partners
* Password hashing using bcrypt
* JWT & cookies support
* Protected routes

### ⚙️ Backend

* RESTful APIs with Express
* MongoDB with Mongoose ODM
* Modular folder structure (controllers, routes, models)
* Environment‑based configuration

### 🎨 Frontend

* Built with React + Vite
* User & Food Partner login/register pages
* API integration using Axios
* CORS & credential handling

---

## 🧰 Tech Stack

**Frontend**

* React
* Vite
* Axios
* CSS

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt
* cookie‑parser
* cors
* dotenv

---

## 📁 Project Structure

```
backend/
 ├── src/
 │   ├── controllers/
 │   ├── routes/
 │   ├── models/
 │   ├── middlewares/
 │   ├── db/
 │   └── app.js
 ├── server.js
 ├── .env
 └── package.json

frontend/
 ├── src/
 ├── pages/
 ├── components/
 └── main.jsx
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **backend** directory:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ How to Run Locally

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/food-delivery-mern-app.git
```

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

Server will start on **[http://localhost:3000](http://localhost:3000)**

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend will run on **[http://localhost:5173](http://localhost:5173)**

---

## 🔗 API Endpoints (Sample)

### User Auth

* `POST /api/auth/user/register`
* `POST /api/auth/user/login`
* `GET /api/auth/user/logout`

### Food Partner

* `POST /api/auth/food-partner/register`
* `POST /api/auth/food-partner/login`

### Food Items

* `POST /api/food/create`
* `GET /api/food/get-food-items`

---

## 🧠 Learning Outcomes

* MERN stack architecture
* Authentication & authorization
* Frontend ↔ Backend communication
* CORS & cookie handling
* Clean code structure

---

## 📌 Future Improvements

* Role‑based authorization middleware
* Order & payment system
* Image upload for food items
* Admin dashboard
* Deployment (Render / Vercel)

---

## 👨‍💻 Author

**Neloy Dutta**
B.Tech (IT) | Full‑Stack Developer (MERN)

---

⭐ If you like this project, don’t forget to star the repo!

