# Task Manager - Day-by-Day Build Plan

## Overview

Building a full-stack task manager with React (Vite) frontend and Spring Boot backend. Data persists in-memory (H2), resets on server restart.

**Total Duration:** ~5 days  
**Complexity:** Beginner-Intermediate  
**Stack:** React, Vite, Spring Boot, JWT, H2, Axios

---

## 📋 Project Structure

```
task-manager/
├── frontend/                 # React + Vite (existing)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Spring Boot (new)
│   ├── src/main/java/com/taskmanager/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── dto/
│   │   ├── security/
│   │   ├── config/
│   │   ├── exception/
│   │   └── TaskManagerApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── README.md
└── README.md
```

---

## 🎯 Day 1: Backend Setup + Authentication

### Morning: Backend Structure

1. **Create backend folder** and verify Maven structure

   ```
   backend/
   ├── pom.xml
   ├── src/main/java/com/taskmanager/
   └── src/main/resources/
   ```

2. **Verify pom.xml** has these dependencies:
   - Spring Boot Web
   - Spring Data JPA
   - Spring Security
   - JWT (jjwt)
   - H2 Database
   - Lombok

3. **Run first build**
   ```bash
   cd backend
   mvn clean install
   ```

### Afternoon: Authentication Layer

1. **Verify entities:**
   - `User.java` - with email, password, createdAt
   - `Task.java` - with title, description, status, category, userId, timestamps

2. **Verify repositories:**
   - `UserRepository.java` - findByEmail, existsByEmail
   - `TaskRepository.java` - findByUserId, findByStatus, etc.

3. **Verify JWT security:**
   - `JwtTokenProvider.java` - generateToken, validateToken, getClaimsFromToken
   - `JwtAuthenticationFilter.java` - extract and validate JWT
   - `SecurityConfig.java` - CORS, JWT chain, endpoint protection

4. **Verify auth service:**
   - `AuthService.java` - register (hash password), login (validate)

### Evening: Test Auth Endpoints

1. **Start backend**

   ```bash
   mvn spring-boot:run
   ```

2. **Test register endpoint** (POST http://localhost:8080/auth/register)

   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

   Expected: Returns token + userId + email

3. **Test login endpoint** (POST http://localhost:8080/auth/login)
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
   Expected: Returns token + userId + email

**End of Day 1 Checklist:**

- [ ] Backend builds successfully
- [ ] H2 database is accessible at http://localhost:8080/h2-console
- [ ] Registration works and hashes password
- [ ] Login works and returns JWT token
- [ ] Token is valid and contains userId + email

---

## 🎯 Day 2: Backend Task CRUD

### Morning: Task Service

1. **Verify TaskService.java** has:
   - `createTask(userId, TaskRequest)` - creates task for user
   - `getUserTasks(userId)` - returns all user tasks
   - `getTask(userId, taskId)` - get single task (verify ownership)
   - `updateTask(userId, taskId, TaskRequest)` - update task (verify ownership)
   - `deleteTask(userId, taskId)` - delete task (verify ownership)
   - Filter methods: `getUserTasksByStatus`, `getUserTasksByCategory`, `searchTasksByTitle`

2. **Verify ownership checks** - all task operations verify userId matches

3. **Test service in terminal:**
   ```bash
   mvn spring-boot:run
   ```

### Afternoon: Task Controller

1. **Verify TaskController.java** endpoints:
   - `POST /tasks` - create
   - `GET /tasks` - list all (with query params for filter/search)
   - `GET /tasks/{id}` - get single
   - `PUT /tasks/{id}` - update
   - `DELETE /tasks/{id}` - delete

2. **Verify all endpoints extract userId from Authentication**

3. **Test each endpoint** using Postman/Thunder Client:
   - Create task (with valid JWT)
   - Get all tasks
   - Filter by status (TODO/COMPLETED)
   - Filter by category
   - Search by title
   - Update task
   - Delete task

### Evening: Error Handling

1. **Verify GlobalExceptionHandler.java** catches:
   - RuntimeException (returns 400)
   - General Exception (returns 500)

2. **Test error scenarios:**
   - Request without JWT → 401 Unauthorized
   - Access another user's task → 401 Unauthorized
   - Invalid task ID → 404 Not Found

**End of Day 2 Checklist:**

- [ ] All CRUD endpoints work
- [ ] Filtering (status, category) works
- [ ] Search by title works
- [ ] Ownership verification prevents cross-user access
- [ ] Error messages are helpful

---

## 🎯 Day 3: Frontend Setup + Auth Pages

### Morning: Frontend Structure

1. **Rename/organize frontend** (if needed)

   ```
   frontend/
   ├── src/
   │   ├── components/
   │   │   ├── Login.jsx
   │   │   ├── Register.jsx
   │   │   ├── ProtectedRoute.jsx
   │   │   ├── Header.jsx
   │   │   └── Footer.jsx
   │   ├── pages/
   │   │   ├── Dashboard.jsx
   │   │   └── Tasks.jsx
   │   ├── services/
   │   │   ├── api.js (Axios client)
   │   │   └── auth.js (JWT utils)
   │   ├── App.jsx
   │   ├── main.jsx
   │   └── index.css
   ```

2. **Install Axios**

   ```bash
   npm install axios
   ```

3. **Create .env file**

   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Update vite.config.js** to use .env:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     // env already auto-loaded by Vite
   });
   ```

### Afternoon: API Client

1. **Create services/api.js:**

   ```javascript
   import axios from "axios";

   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

   export const apiClient = axios.create({
     baseURL: API_BASE_URL,
   });

   // Attach JWT to requests
   apiClient.interceptors.request.use((config) => {
     const token = localStorage.getItem("token");
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   ```

2. **Create services/auth.js:**

   ```javascript
   import { apiClient } from "./api";

   export const register = (email, password) =>
     apiClient.post("/auth/register", { email, password });

   export const login = (email, password) =>
     apiClient.post("/auth/login", { email, password });

   export const saveToken = (token) => {
     localStorage.setItem("token", token);
   };

   export const getToken = () => localStorage.getItem("token");

   export const removeToken = () => {
     localStorage.removeItem("token");
   };
   ```

### Evening: Auth Pages

1. **Create components/Register.jsx:**
   - Email + password form
   - Register button
   - Link to login
   - Error/success messages
   - Redirect to dashboard on success

2. **Create components/Login.jsx:**
   - Email + password form
   - Login button
   - Link to register
   - Error messages
   - Redirect to dashboard on success

3. **Create components/ProtectedRoute.jsx:**
   - Check localStorage for token
   - Redirect to /login if no token
   - Otherwise render component

**End of Day 3 Checklist:**

- [ ] Axios configured with API base URL
- [ ] JWT auto-attached to all requests
- [ ] Register page works and calls backend
- [ ] Login page works and saves token to localStorage
- [ ] ProtectedRoute component redirects unauthenticated users
- [ ] No CORS errors (backend CORS is configured)

---

## 🎯 Day 4: Frontend Task Pages

### Morning: Dashboard Page

1. **Create pages/Dashboard.jsx:**
   - Protected route (use ProtectedRoute wrapper)
   - Display stats:
     - Total tasks
     - Completed tasks
     - Pending tasks
   - Cards showing numbers
   - Link to /tasks

2. **Create components/Header.jsx:**
   - Navigation links (Dashboard, Tasks)
   - Logout button
   - Current user email
   - Responsive layout

3. **Create components/Footer.jsx:**
   - Simple footer with copyright

### Afternoon: Tasks Page

1. **Create pages/Tasks.jsx:**
   - Protected route
   - Display task list in table or cards
   - Show:
     - Title, description, status, category, date
   - Each task card has:
     - Edit button
     - Delete button

2. **Create components/TaskList.jsx:**
   - Display tasks in list format
   - Handle loading state
   - Handle empty state

3. **Create components/TaskForm.jsx:**
   - Form to create/edit task
   - Fields: title, description, category, status
   - Submit button
   - Clear/cancel button
   - Modal or inline form

### Afternoon/Evening: Task Operations

1. **Implement create task:**
   - Form validation (title required)
   - POST to /tasks
   - Show success toast
   - Add task to list

2. **Implement edit task:**
   - Populate form with task data
   - PUT to /tasks/{id}
   - Show success toast
   - Update task in list

3. **Implement delete task:**
   - Confirmation modal
   - DELETE /tasks/{id}
   - Show success toast
   - Remove task from list

**End of Day 4 Checklist:**

- [ ] Dashboard displays task statistics correctly
- [ ] Tasks page loads and displays all tasks
- [ ] Can create new task
- [ ] Can edit existing task
- [ ] Can delete task with confirmation
- [ ] Logout button clears token and redirects to login
- [ ] Responsive design works on mobile

---

## 🎯 Day 5: Filtering, Search + Polish

### Morning: Filtering & Search

1. **Add filter controls to Tasks page:**
   - Status filter (All, TODO, COMPLETED)
   - Category filter (dropdown/multi-select)
   - Search by title (search box)

2. **Implement frontend filtering logic:**

   ```javascript
   // GET /tasks?status=TODO
   // GET /tasks?category=Work
   // GET /tasks?search=Meeting
   ```

3. **Test all filter combinations**

### Afternoon: UI/UX Polish

1. **Add loading states:**
   - Show spinner while fetching
   - Disable buttons while loading

2. **Add error handling:**
   - Toast notifications (success/error)
   - User-friendly error messages

3. **Add form validation:**
   - Email format validation
   - Password length validation
   - Required field validation

4. **Improve styling:**
   - Update Tailwind CSS classes
   - Ensure black/white theme with minimal accent
   - Responsive on mobile, tablet, desktop

### Afternoon/Evening: Final Testing

1. **Full user flow test:**
   - Register new user
   - Login
   - Create multiple tasks
   - Filter by status
   - Filter by category
   - Search by title
   - Edit task
   - Delete task
   - Logout
   - Login with same account (verify data persists)

2. **Cross-browser testing:**
   - Chrome/Edge
   - Firefox
   - Mobile browser

3. **Backend restart test:**
   - Verify data is gone after restart (expected for in-memory DB)

### Evening: Final Tweaks

1. **Verify JWT expiration handling:**
   - Token expires (24 hours)
   - Show message to re-login

2. **Fix any remaining issues**

3. **Clean up console errors**

**End of Day 5 Checklist:**

- [ ] All filters work
- [ ] Search works
- [ ] Toast notifications show
- [ ] Loading states work
- [ ] Form validation works
- [ ] Responsive design verified
- [ ] Full user flow works end-to-end
- [ ] No console errors

---

## 🚀 Deployment Prep (Optional)

### Frontend (Vercel)

```bash
# Build
npm run build

# Deploy to Vercel (via GitHub or CLI)
# Set env var: VITE_API_BASE_URL=https://your-backend.onrender.com
```

### Backend (Render or Railway)

```bash
# Update application.properties for production:
# jwt.secret=YOUR_SECURE_KEY_HERE
# frontend.url=https://your-frontend.vercel.app

# Deploy via GitHub
```

---

## 📝 Key Files Created

### Backend

- `backend/pom.xml` - Dependencies and build config
- `backend/src/main/java/com/taskmanager/` - All Java classes
- `backend/src/main/resources/application.properties` - Configuration

### Frontend

- `frontend/src/services/api.js` - Axios client
- `frontend/src/services/auth.js` - Auth utilities
- `frontend/src/components/Login.jsx` - Login page
- `frontend/src/components/Register.jsx` - Register page
- `frontend/src/components/ProtectedRoute.jsx` - Route protection
- `frontend/src/pages/Dashboard.jsx` - Dashboard page
- `frontend/src/pages/Tasks.jsx` - Tasks management page
- `frontend/.env` - Environment variables

---

## 🐛 Common Issues & Solutions

| Issue                           | Solution                                                      |
| ------------------------------- | ------------------------------------------------------------- |
| CORS error                      | Verify backend SecurityConfig has frontend.url configured     |
| JWT not working                 | Check token is saved to localStorage after login              |
| 401 Unauthorized                | Verify JWT is attached in Authorization header (Bearer token) |
| Database is empty after restart | This is expected - H2 in-memory resets                        |
| Frontend can't reach backend    | Check VITE_API_BASE_URL points to correct backend URL         |
| Login always fails              | Check password hashing (BCryptPasswordEncoder)                |

---

## 📊 Development Timeline

| Day | Focus                | Key Deliverable                            |
| --- | -------------------- | ------------------------------------------ |
| 1   | Backend setup + Auth | Working register/login with JWT            |
| 2   | Backend CRUD         | Task endpoints with ownership verification |
| 3   | Frontend auth        | Login/register pages, token storage        |
| 4   | Frontend tasks       | Dashboard, task CRUD operations            |
| 5   | Filtering + Polish   | Search, filters, error handling, styling   |

---

## ✅ Success Criteria

- [ ] Backend runs on port 8080
- [ ] Frontend runs on port 5173
- [ ] User can register with email/password
- [ ] User can login and get JWT token
- [ ] User can create/read/update/delete tasks
- [ ] Users can only see their own tasks
- [ ] Filters (status, category, search) work
- [ ] Responsive design on mobile + desktop
- [ ] Error messages are user-friendly
- [ ] No console errors or warnings

---

## Next Steps After Day 5

1. **Deploy to production** (Vercel + Render)
2. **Add more features:** categories CRUD, recurring tasks, due dates
3. **Add notifications:** Email alerts for task reminders
4. **Add testing:** Unit tests for services, integration tests
5. **Add analytics:** Track completed tasks over time
6. **Mobile app:** React Native or Flutter

---

Good luck! 🚀
