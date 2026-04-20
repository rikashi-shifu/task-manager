# Task Manager Backend (Spring Boot)

Spring Boot REST API backend for the Task Manager application.

## Features

- User authentication (Register/Login) with JWT
- Task CRUD operations
- Task filtering by status, category, date
- Task search by title
- In-memory H2 database
- CORS enabled for frontend communication

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Setup

1. Install Java 17+
2. Navigate to backend directory: `cd backend`
3. Build the project: `mvn clean install`
4. Run the application: `mvn spring-boot:run`

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Tasks (Protected)

- `GET /tasks` - Get all user tasks
- `POST /tasks` - Create new task
- `GET /tasks/{id}` - Get specific task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

Query Parameters:

- `status` - Filter by status (TODO, COMPLETED)
- `category` - Filter by category
- `search` - Search by title

## Environment Configuration

Edit `src/main/resources/application.properties`:

```properties
# Server
server.port=8080

# JWT
jwt.secret=your_super_secret_key_here
jwt.expiration=86400000

# CORS
frontend.url=http://localhost:5173
```

## H2 Console

Access H2 console at: `http://localhost:8080/h2-console`

- URL: `jdbc:h2:mem:testdb`
- User: `sa`
- Password: (empty)

## Database Schema

**Users Table:**

- id (Long)
- email (String, unique)
- password (String, hashed)
- created_at (Long)

**Tasks Table:**

- id (Long)
- title (String)
- description (String)
- status (String: TODO, COMPLETED)
- category (String)
- user_id (Long)
- created_at (Long)
- updated_at (Long)

## Technology Stack

- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- H2 Database
- Maven

## Development

For hot reload during development:

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.devtools.restart.enabled=true"
```
