# Running the Full Stack Application

## Quick Start (From Root Directory)

### Terminal 1: Backend

```bash
npm run backend:run
```

Backend runs on `http://localhost:8080`

### Terminal 2: Frontend

```bash
npm run frontend:dev
```

Frontend runs on `http://localhost:5173`

---

## Individual Commands

### Frontend

```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
cd backend
mvn clean install    # Install dependencies
mvn spring-boot:run  # Start server
mvn clean test       # Run tests
```

---

## Detailed Setup

### 1. Install All Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
mvn clean install
```

### 2. Start Backend (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

**Expected Output:**

```
Started TaskManagerApplication in X.XXX seconds
```

Backend API: `http://localhost:8080`
H2 Console: `http://localhost:8080/h2-console`

### 3. Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

**Expected Output:**

```
VITE v5.4.21 ready in 626 ms
Local: http://localhost:5173/
```

Frontend: `http://localhost:5173`

---

## Testing the Application

### Manual Testing Flow

1. **Open frontend**: Visit `http://localhost:5173`
2. **Register**: Create account (email + password)
   - Email: `test@example.com`
   - Password: `password123`
3. **Login**: Use registered credentials
4. **Dashboard**: View task statistics
5. **Tasks Page**:
   - Create task: Click "+ New Task"
   - Edit task: Click "Edit" button
   - Delete task: Click "Delete" button
   - Filter: Use status/category/search filters
6. **Logout**: Click "Logout" in header

---

## API Testing

### Using cURL or Postman

#### Register

```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

#### Login

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Response** (save the token):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "email": "user@example.com",
  "message": "Login successful"
}
```

#### Create Task

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "TODO",
    "category": "Personal"
  }'
```

#### List Tasks

```bash
curl -X GET http://localhost:8080/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Task

```bash
curl -X PUT http://localhost:8080/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Buy groceries",
    "status": "COMPLETED"
  }'
```

#### Delete Task

```bash
curl -X DELETE http://localhost:8080/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Troubleshooting

### Backend won't start

```bash
# Check Java version
java -version    # Should be Java 17+

# Check if port 8080 is in use
netstat -an | find ":8080"

# Kill process on 8080 (Windows)
netstat -ano | find "8080"
taskkill /PID <PID> /F
```

### Frontend won't start

```bash
# Check Node version
node --version    # Should be 16+

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -r node_modules package-lock.json
npm install

# Verify Vite installation
npm list vite
```

### CORS errors

- Backend must allow frontend origin
- Check `frontend.url` in `backend/application.properties`
- Verify `VITE_API_BASE_URL` in `frontend/.env`

### JWT errors

- Clear localStorage in browser DevTools
- Re-login to get fresh token
- Check token expiration in `application.properties`

---

## Development Workflow

### 1. Make Frontend Changes

- Edit files in `frontend/src/`
- Vite auto-reloads (HMR)
- Check browser console for errors

### 2. Make Backend Changes

- Edit files in `backend/src/`
- Restart: `Ctrl+C` → `mvn spring-boot:run`
- Check logs for errors

### 3. Add New Features

- Frontend: Create components in `frontend/src/components/`
- Backend: Create classes in `backend/src/main/java/com/taskmanager/`
- Both: Update API endpoints and frontend calls

---

## Production Build

### Frontend Build

```bash
cd frontend
npm run build
```

Output: `frontend/dist/`

### Backend Build

```bash
cd backend
mvn clean package
```

Output: `backend/target/task-manager-backend-1.0.0.jar`

---

## Environment Variables

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:8080
```

### Backend (application.properties)

```
server.port=8080
jwt.secret=your_super_secret_key_here
jwt.expiration=86400000
frontend.url=http://localhost:5173
```

---

## Docker Deployment (Optional)

### Backend Docker

```dockerfile
FROM openjdk:21
COPY backend/target/task-manager-backend-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
```

### Frontend Docker

```dockerfile
FROM node:20 AS build
COPY frontend /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
```

---

## Useful Links

- **Frontend Docs**: `frontend/README.md`
- **Backend Docs**: `backend/README.md`
- **Main README**: `README.md`
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Spring Boot Docs**: https://spring.io/projects/spring-boot

---

Happy coding! 🚀
