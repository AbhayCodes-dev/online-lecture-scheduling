# 📘 Online Lecture Scheduling System

A full-stack MERN application built to manage courses, instructors, and daily lecture scheduling for educational institutes. This system allows admins to create courses, assign instructors, and schedule multiple lecture batches per day while preventing instructor-date conflicts.

---

## 🚀 Tech Stack

### **Frontend**
- React (Vite)
- React Router
- Fetch API

### **Backend**
- Node.js + Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

## ✨ Features

### 👨‍💼 Admin Features
- Add instructors with:
  - Name
  - Email
  - Phone
  - Profile Image URL
  - Number of batches they can take per lecture
- Add courses with:
  - Name
  - Level
  - Description
  - Image URL
- Schedule lectures:
  - Select instructor
  - Select course
  - Select date
  - Assign number of batches for that lecture
- **Automatic conflict prevention**:
  - An instructor cannot be assigned two different courses on the same date
- View all instructors
- View all courses
- View all lectures

### 👩‍🏫 Instructor Features
- Login using credentials
- View all scheduled lectures assigned to them with:
  - Course name
  - Lecture date
  - Number of batches

### 🔐 Security
- JWT authentication
- Password hashing with bcrypt
- Separate admin and instructor features

---

## 🗄️ Database Collections (MongoDB Atlas)

- `users`
- `courses`
- `lectures`

---

## 📦 Project Structure

online-lecture-scheduling
│
├── backend
│ ├── config/db.js
│ ├── middleware/auth.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Course.js
│ │ └── Lecture.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── instructors.js
│ │ ├── courses.js
│ │ └── lectures.js
│ ├── server.js
│ ├── package.json
│ └── .env (not included)
│
└── frontend
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Admin.jsx
│ │ └── Instructor.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── vite.config.js
└── package.json

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file inside `/backend`:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

yaml
Copy code

---

## ▶️ Running the Project Locally

### **1️⃣ Start Backend**
cd backend
npm install
npm run dev

markdown
Copy code

### **2️⃣ Start Frontend**
cd frontend
npm install
npm run dev

yaml
Copy code

Backend default: `http://localhost:5000`  
Frontend default: `http://localhost:5173`

---

## 🌐 Deployment Guide

### **Backend Deployment (Render)**
- Create a new Web Service
- Select your GitHub repository
- Set environment variables
- Deploy
- Replace all frontend fetch URLs with:
https://your-backend.onrender.com/api/...

yaml
Copy code

### **Frontend Deployment (Netlify or Vercel)**
- Upload the `frontend` folder
- Build command: `npm run build`
- Publish directory: `dist`
- Update fetch URLs to production backend

---

## 📝 API Endpoints Overview

### **Auth**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register admin/instructor |
| POST | `/api/auth/login` | Login |

### **Instructors**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/instructors` | Add instructor |
| GET | `/api/instructors` | Get all instructors |

### **Courses**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/courses` | Create course |
| GET | `/api/courses` | Get all courses |

### **Lectures**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/lectures` | Schedule lecture |
| GET | `/api/lectures` | Get all lectures |

---

## 🎥 Screen Recording Requirements
Record a video showing:
1. Login page  
2. Admin adding instructor  
3. Admin adding course  
4. Admin scheduling lecture  
5. Conflict prevention working  
6. Instructor login  
7. Instructor dashboard  
8. Code walkthrough (folder structure)  
9. GitHub repo  
10. Running deployed version  

---

## 📚 Database Dump (MongoDB Atlas Export)

Steps:
1. Open MongoDB Atlas  
2. Select your cluster  
3. Go to Collections  
4. Choose “Export Collection”  
5. Export as JSON  
6. Upload the exported JSON to Google Drive  

---

## ✔ Submission Checklist

- Deployed Backend URL  
- Deployed Frontend URL  
- Admin & Instructor credentials (sent separately)  
- GitHub repository link  
- Database dump (JSON)  
- Screen recording (Google Drive link)  
- README.md (this file)

---

## 👨‍💻 Author
**Abhay Yadav**  
Full-Stack Developer (MERN)
