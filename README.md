# Online Lecture Scheduling System

The Online Lecture Scheduling System is a full-stack MERN application designed for educational institutions to manage courses, schedule lectures, handle faculty, and streamline communication between admins and users.

## ✨ Features

### 🔐 Authentication & Authorization
- Secure login for Admins and Users
- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control

### 🎓 Courses Management
- Add, edit, delete, list courses
- Assign faculty to courses
- Fully responsive UI

### 📅 Lecture Scheduling
- Create, update, delete schedules
- Prevent overlapping lectures
- Upcoming & past lecture view

### 👨‍🏫 Faculty Management
- Add/manage faculty
- Assign to multiple courses
- Central dashboard access

### 👥 User Management
- Create, update, delete users
- Admin-only operations
- Live list updates

### 📊 Admin Dashboard
- Summary of all entities
- Quick actions
- Clean and responsive design

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router
- Bootstrap
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt

## 📩 API Base URL (ENV Based)

Development:
http://localhost:5000/api

Production:
YOUR_DEPLOYED_BACKEND_URL/api

(Manually update the fetch() URLs during deployment.)

## 📦 Installation & Setup

### Clone Repository
git clone https://github.com/AbhayCodes-dev/online-lecture-scheduling.git

### Backend Setup
cd backend

npm install

npm start

### Frontend Setup
cd ../frontend

npm install

npm run dev

## 🧾 Environment Variables (Backend)

Create a `.env` file inside the backend folder:

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret_key

PORT=5000

(Do NOT commit .env — credentials will be shared separately.)

## 🛡 Security Notes
- Passwords hashed with bcrypt
- JWT auth protection on routes
- Role-based access control
- Node_modules + env protected via .gitignore


## 📘 Documentation
- Clean MVC backend structure
- Component-based React frontend
- Easy to maintain and extend

## 📬 Contact
For queries or collaboration:

**Abhay Mahendra Yadav**  
Full Stack Developer (MERN)
