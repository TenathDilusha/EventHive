# 🐝 EventHive - University Event Management Platform

<div align="center">

**The Heart of University Events**

A scalable full-stack event management platform designed for universities. EventHive streamlines event discovery, registration, approval, and analytics through a centralized web interface.

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [User Roles](#-user-roles)
- [Project Structure](#-project-structure)

---

## ✨ Features

### 🎯 Core Features
- **Event Discovery** - Browse and search events by category, date, and keyword
- **One-Click Registration** - Register for events instantly with capacity tracking
- **Approval Workflow** - Admin approval system for event submissions
- **Analytics Dashboard** - Real-time insights on events, registrations, and engagement
- **Role-Based Access** - Tailored interfaces for Students, Organizers, and Admins

### 🔐 Security
- JWT-based authentication with token refresh
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Input validation and sanitization

### 📊 Analytics
- Total events, users, and registration counts
- Event fill rates and capacity tracking
- Pending approvals monitoring
- Per-event analytics

---

## 🛠️ Tech Stack

| Layer          | Technology               |
|----------------|--------------------------|
| **Frontend**   | React 18 + Vite          |
| **Backend**    | NestJS (Node.js)         |
| **Database**   | PostgreSQL               |
| **ORM**        | TypeORM                  |
| **Auth**       | JWT + Passport.js        |
| **Styling**    | Custom CSS Design System |
| **Routing**    | React Router v6          |
| **HTTP**       | Axios                    |

---

## 🏗️ Architecture

```
EventHive/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context (Auth)
│   │   ├── pages/            # Page components
│   │   │   └── dashboard/    # Dashboard sub-pages
│   │   ├── services/         # API service layer
│   │   └── styles/           # Global CSS design system
│   └── index.html
│
└── backend/                  # NestJS backend
    └── src/
        ├── auth/             # Authentication module
        │   ├── decorators/   # Custom decorators (@Roles)
        │   ├── dto/          # Data Transfer Objects
        │   ├── guards/       # JWT & Roles guards
        │   └── strategies/   # Passport JWT strategy
        ├── users/            # Users module
        ├── events/           # Events module
        ├── registrations/    # Registrations module
        └── analytics/        # Analytics module
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Database

Create a PostgreSQL database:
```sql
CREATE DATABASE eventhive;
```

Update `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=eventhive
JWT_SECRET=your_secret_key
JWT_EXPIRATION=24h
PORT=5000
```

### 3. Run the Application

```bash
# Start Backend (Terminal 1)
cd backend
npm run start:dev

# Start Frontend (Terminal 2)
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint           | Description        | Auth |
|--------|--------------------|--------------------|------|
| POST   | `/api/auth/register` | Register user    | ❌   |
| POST   | `/api/auth/login`    | Login            | ❌   |
| GET    | `/api/auth/me`       | Get profile      | ✅   |

### Events
| Method | Endpoint                  | Description         | Auth  |
|--------|---------------------------|---------------------|-------|
| GET    | `/api/events`             | List all events     | ❌    |
| GET    | `/api/events/approved`    | List approved       | ❌    |
| GET    | `/api/events/featured`    | Featured events     | ❌    |
| GET    | `/api/events/:id`         | Get event details   | ❌    |
| POST   | `/api/events`             | Create event        | ✅ 🎯 |
| PUT    | `/api/events/:id`         | Update event        | ✅    |
| PATCH  | `/api/events/:id/status`  | Update status       | ✅ 👑 |
| DELETE | `/api/events/:id`         | Delete event        | ✅    |

### Registrations
| Method | Endpoint                       | Description          | Auth |
|--------|--------------------------------|----------------------|------|
| POST   | `/api/registrations`           | Register for event   | ✅   |
| GET    | `/api/registrations/my-registrations` | My registrations | ✅   |
| GET    | `/api/registrations/event/:id` | Event registrations  | ✅   |
| PATCH  | `/api/registrations/:id/cancel`| Cancel registration  | ✅   |

### Analytics
| Method | Endpoint                    | Description        | Auth |
|--------|-----------------------------|--------------------|------|
| GET    | `/api/analytics/dashboard`  | Dashboard stats    | ✅   |
| GET    | `/api/analytics/event/:id`  | Event analytics    | ✅   |

🎯 = Organizer/Admin only | 👑 = Admin only

---

## 👥 User Roles

| Role        | Capabilities                                    |
|-------------|------------------------------------------------|
| **Student** | Browse events, register/cancel, view dashboard  |
| **Organizer** | All student + create/manage own events        |
| **Admin**   | All organizer + approve/reject events, manage users |

---

## 🎨 Design System

The frontend uses a custom CSS design system featuring:
- **Dark theme** with glassmorphism effects
- **Honey Gold & Deep Purple** color palette
- **Inter & Outfit** typography
- **CSS custom properties** for consistent theming
- **Responsive** mobile-first design
- **Micro-animations** for enhanced UX

---

## 📄 License

MIT License - feel free to use for your university!
