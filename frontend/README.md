# Task Manager Frontend

A modern, production-ready React + Vite frontend for the Task Manager application.

## 🚀 Tech Stack

- **React** 18.3.1 - UI library
- **Vite** 5.4.10 - Build tool & dev server
- **React Router** 6.20.0 - Client-side routing
- **Axios** 1.6.2 - HTTP client with JWT interceptor
- **Tailwind CSS** 3.4.1 - Utility-first CSS
- **ESLint** - Code linting

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/                  # API client & endpoints
│   │   ├── client.js         # Axios client with JWT interceptor
│   │   ├── auth.js           # Auth API endpoints
│   │   └── tasks.js          # Task API endpoints
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Toast.jsx         # Toast notifications
│   │   ├── Loading.jsx       # Loading spinner
│   │   ├── ProtectedRoute.jsx # Route protection HOC
│   │   ├── TaskForm.jsx      # Task create/edit modal
│   │   ├── TaskList.jsx      # Task list display
│   │   └── TaskFilters.jsx   # Task filter controls
│   ├── context/              # React Context
│   │   └── AuthContext.jsx   # Auth state management
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js        # Auth context hook
│   │   └── useToast.js       # Toast notifications hook
│   ├── pages/                # Page components
│   │   ├── LoginPage.jsx     # Login form
│   │   ├── RegisterPage.jsx  # Register form
│   │   ├── DashboardPage.jsx # Dashboard (stats)
│   │   ├── TasksPage.jsx     # Tasks management
│   │   └── NotFoundPage.jsx  # 404 page
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   ├── index.css             # Tailwind CSS
│   └── App.css               # App animations
├── public/                   # Static assets
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Dependencies
└── .env                      # Environment variables
```

## 🎯 Features

### Authentication

- ✅ User registration with email validation
- ✅ User login with JWT token storage
- ✅ Protected routes (redirect to /login if not authenticated)
- ✅ Auto-logout on token expiration (401 response)
- ✅ Persistent auth state (localStorage)

### Task Management

- ✅ Create tasks with title, description, status, category
- ✅ Read/list all user tasks
- ✅ Edit task details
- ✅ Delete tasks with confirmation
- ✅ Filter by status (TODO/COMPLETED)
- ✅ Filter by category
- ✅ Search by title
- ✅ Display task timestamps (created/updated)

### Dashboard

- ✅ Total tasks count
- ✅ Completed tasks count
- ✅ Pending tasks count
- ✅ Quick navigation links

### UI/UX

- ✅ Black & white minimalist design with blue accent
- ✅ Responsive layout (mobile + desktop)
- ✅ Loading states for async operations
- ✅ Toast notifications (success/error/info)
- ✅ Form validation with error messages
- ✅ Modal dialogs for task creation/editing
- ✅ Smooth animations & transitions

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 16+
- npm 8+

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080
```

For production:

```
VITE_API_BASE_URL=https://your-backend-url.com
```

## 🚀 Running the App

### Development Server

```bash
npm run dev
```

Opens on `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Outputs to `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 📚 API Integration

The frontend connects to the backend REST API at `VITE_API_BASE_URL`:

### Authentication Endpoints

```
POST /auth/register
POST /auth/login
```

### Task Endpoints (JWT Protected)

```
GET    /tasks                    # List all tasks
POST   /tasks                    # Create task
GET    /tasks/{id}               # Get single task
PUT    /tasks/{id}               # Update task
DELETE /tasks/{id}               # Delete task
```

### JWT Token Management

- Token automatically attached to all requests via `Authorization: Bearer <token>` header
- Token stored in localStorage after login
- Token cleared on logout or 401 response
- Automatic redirect to /login on token expiration

## 🔐 Security Features

- ✅ JWT Bearer token authentication
- ✅ Protected routes prevent unauthorized access
- ✅ Secure token storage (localStorage)
- ✅ Automatic token refresh on 401
- ✅ CORS-enabled for cross-origin requests
- ✅ Input validation on forms
- ✅ XSS protection via React's built-in escaping

## 🎨 Styling

Uses **Tailwind CSS** for utility-first styling:

- Dark header (`bg-gray-900`)
- Light background (`bg-white` / `bg-gray-50`)
- Blue accent color (`text-blue-600`)
- Responsive grid layouts
- Smooth transitions & hover states

### Customization

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

## 🧪 Testing with Backend

1. **Start Backend** (separate terminal):

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   Backend runs on `http://localhost:8080`

2. **Start Frontend** (separate terminal):

   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:5173`

3. **Test Flow**:
   - Go to `http://localhost:5173/register`
   - Create account (e.g., `user@example.com` / `password123`)
   - Login with same credentials
   - Create, edit, delete tasks
   - View dashboard stats
   - Filter and search tasks

## 🐛 Troubleshooting

### CORS Errors

- Verify backend CORS config includes frontend origin
- Check `VITE_API_BASE_URL` is correct

### JWT Token Not Working

- Verify token is in localStorage after login
- Check Network tab → Authorization header
- Ensure jwt.secret matches between frontend and backend

### Cannot Connect to Backend

- Verify backend is running on `http://localhost:8080`
- Check `VITE_API_BASE_URL` in `.env`
- Check browser console for errors

### Blank Page After Login

- Check browser console for JavaScript errors
- Verify all dependencies are installed (`npm install`)
- Clear browser cache and localStorage

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder.

### Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```
4. Deploy (auto CI/CD on push)

### Deploy to Netlify

1. Run `npm run build`
2. Drag `dist/` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist/`

## 📝 Development Tips

- Use `npm run dev` for fast hot-reload during development
- Check browser console and Network tab for API errors
- Use React DevTools extension for component debugging
- Use Axios interceptor debugging in browser Network tab

## 🔄 API Response Format

Success Response:

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "...",
  "status": "TODO",
  "category": "Personal",
  "createdAt": 1234567890,
  "updatedAt": null
}
```

Error Response:

```json
{
  "message": "Task not found",
  "status": 404
}
```

## 📄 License

Open source - use for learning/demo purposes.

---

**Happy coding! 🚀**

For backend API documentation, see `/backend/README.md`

For full project info, see `/README.md`
