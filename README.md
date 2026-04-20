# Task Manager - Full Stack Application

A minimal, production-ready full-stack task manager built with React (Vite) + Spring Boot.

**⚠️ Data Persistence Note:** This app uses an in-memory H2 database. All data is lost when the backend restarts. This is fine for a demo/mini project but not for production.

---

## 📁 Project Structure

```
task-manager/
├── frontend/              # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/               # Spring Boot REST API
│   ├── src/main/java/com/taskmanager/
│   ├── pom.xml
│   └── application.properties
├── BUILD_PLAN.md          # Day-by-day build instructions
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Java 17+
- Node.js 16+
- Maven 3.6+
- npm or yarn

### 1. Start Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

Check H2 console at `http://localhost:8080/h2-console`

### 2. Start Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 3. Test the App

1. Go to `http://localhost:5173`
2. Register with email/password
3. Login
4. Create, edit, delete tasks
5. Filter by status, category, or search by title

---

## 📋 Features

### Authentication

- ✅ User registration (email + password)
- ✅ User login with JWT
- ✅ Secure password hashing (BCrypt)
- ✅ Protected routes

### Tasks

- ✅ Create task
- ✅ Read/list tasks
- ✅ Update task
- ✅ Delete task
- ✅ Filter by status (TODO, COMPLETED)
- ✅ Filter by category
- ✅ Search by title

### UI/UX

- ✅ Black & white minimalist design
- ✅ Responsive (mobile + desktop)
- ✅ Loading states
- ✅ Error handling with toast notifications
- ✅ Form validation

---

## 🏗️ Architecture

### Frontend (React + Vite)

- **State Management:** React hooks (useState, useEffect)
- **HTTP Client:** Axios with JWT interceptor
- **Styling:** Tailwind CSS
- **Routing:** React Router (Protected routes)

### Backend (Spring Boot)

- **Web Framework:** Spring Web
- **Auth:** Spring Security + JWT (JJWT)
- **Database:** Spring Data JPA + H2 (in-memory)
- **Error Handling:** Global exception handler

### Communication

- **REST API** with JWT Bearer tokens
- **CORS** enabled for frontend origin

---

## 📚 API Documentation

### Auth Endpoints

```
POST /auth/register
Request: { email, password }
Response: { token, userId, email, message }

POST /auth/login
Request: { email, password }
Response: { token, userId, email, message }
```

### Task Endpoints (Protected with JWT)

```
GET /tasks
Query params: ?status=TODO&category=Work&search=title
Response: [{ id, title, description, status, category, createdAt, updatedAt }]

POST /tasks
Request: { title, description, status, category }
Response: { id, title, description, status, category, createdAt, updatedAt }

GET /tasks/{id}
Response: { id, title, description, status, category, createdAt, updatedAt }

PUT /tasks/{id}
Request: { title, description, status, category }
Response: { id, title, description, status, category, createdAt, updatedAt }

DELETE /tasks/{id}
Response: 204 No Content
```

---

## 🛠️ Environment Configuration

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:8080
```

For production (Vercel):

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### Backend (application.properties)

```properties
server.port=8080

# JWT
jwt.secret=your_super_secret_key_here
jwt.expiration=86400000

# CORS
frontend.url=http://localhost:5173
```

For production (Render):

```properties
jwt.secret=YOUR_PROD_SECRET_KEY
frontend.url=https://your-frontend.vercel.app
```

---

## 📖 Build Plan

See [BUILD_PLAN.md](BUILD_PLAN.md) for a detailed day-by-day guide to building this app from scratch.

**Quick Summary:**

- **Day 1:** Backend setup + authentication
- **Day 2:** Backend task CRUD
- **Day 3:** Frontend setup + auth pages
- **Day 4:** Frontend task pages
- **Day 5:** Filtering, search, polish

---

## 🗄️ Database Schema

### H2 In-Memory Database

**Users Table:**

```sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at BIGINT NOT NULL
);
```

**Tasks Table:**

```sql
CREATE TABLE tasks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000),
  status VARCHAR(50) NOT NULL,
  category VARCHAR(255) NOT NULL,
  user_id BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT
);
```

---

## 📦 Tech Stack

| Layer          | Technology   | Version |
| -------------- | ------------ | ------- |
| Frontend       | React        | 18.3.1  |
| Frontend Build | Vite         | 5.4.10  |
| Styling        | Tailwind CSS | Latest  |
| Frontend HTTP  | Axios        | Latest  |
| Backend        | Spring Boot  | 3.2.0   |
| Backend Auth   | JWT (JJWT)   | 0.12.3  |
| Backend DB     | H2           | Latest  |
| Build Tool     | Maven        | 3.6+    |

---

## 🚢 Deployment

### Frontend → Vercel

1. Push to GitHub
2. Connect Vercel repo
3. Set env: `VITE_API_BASE_URL=https://your-backend.onrender.com`
4. Deploy (auto CI/CD)

### Backend → Render

1. Push to GitHub
2. Create new Web Service on Render
3. Select GitHub repo
4. Set build command: `mvn install`
5. Set start command: `java -jar target/task-manager-backend-1.0.0.jar`
6. Set env vars: `jwt.secret` and `frontend.url`
7. Deploy

---

## 🐛 Troubleshooting

**Frontend CORS Error**

- Verify backend CORS is configured for frontend origin
- Check `frontend.url` in application.properties

**JWT Token Not Working**

- Verify token is saved to localStorage after login
- Check Authorization header: `Bearer <token>`
- Verify jwt.secret is the same in all environments

**Database is Empty**

- This is normal! H2 in-memory resets on server restart
- To persist data, use PostgreSQL/MySQL instead of H2

**Cannot Connect to Backend**

- Verify backend is running: `http://localhost:8080`
- Check `VITE_API_BASE_URL` in frontend .env
- Check CORS is not blocked in browser dev tools

---

## 📝 Example User Flow

1. **Register**
   - Visit `http://localhost:5173/register`
   - Enter email: `john@example.com`, password: `password123`
   - Click Register → redirected to dashboard

2. **Create Task**
   - Click "New Task"
   - Title: "Buy groceries", Category: "Personal", Status: "TODO"
   - Click "Create"

3. **Filter Tasks**
   - Filter by Status: "TODO" → shows only incomplete tasks
   - Filter by Category: "Work" → shows work tasks

4. **Search Task**
   - Search "groceries" → finds "Buy groceries" task

5. **Complete Task**
   - Click Edit → Change status to "COMPLETED"
   - Click Save

6. **Delete Task**
   - Click Delete → Confirm → Task removed

7. **Logout**
   - Click Logout in header → redirected to login page

---

## 💡 Next Steps

1. **Production Deploy:** Use Vercel + Render
2. **Database Upgrade:** Switch from H2 to PostgreSQL
3. **Features:** Categories CRUD, due dates, recurring tasks
4. **Testing:** Unit tests, integration tests, E2E tests
5. **Mobile:** React Native app for iOS/Android

---

## 📄 License

Open source - use for learning/demo purposes.

---

## 🤝 Contributing

This is a learning project. Feel free to fork and customize!

---

## ❓ Questions?

See [BUILD_PLAN.md](BUILD_PLAN.md) for detailed step-by-step instructions.

Visit the `/backend/README.md` and `/frontend` docs for more info.

**Happy coding! 🚀**
