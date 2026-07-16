<div align="center">

# 🚀 Project Management Backend

### Production-Ready Project Management Backend API

<p align="center">
A scalable RESTful backend built with <b>Node.js</b>, <b>Express.js</b>, and <b>MongoDB</b> for collaborative project management, authentication, task management, RBAC, secure file uploads, and enterprise-grade API architecture.
</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge&logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?style=for-the-badge&logo=swagger)
![Joi](https://img.shields.io/badge/Joi-Validation-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

<p align="center">

<a href="https://github.com/abhimanyuBuilds/Project_Management">Repository</a>
•
<a href="#installation">Installation</a>
•
<a href="#features">Features</a>
•
<a href="#api-endpoints">API</a>
•
<a href="#architecture">Architecture</a>

</p>

</div>

---

# 📖 About

Project Camp Backend is a **production-ready REST API** designed for collaborative project management.

The application enables organizations and teams to manage projects, assign members, organize tasks and subtasks, upload files, maintain project notes, and secure every endpoint using **JWT Authentication** and **Role-Based Access Control (RBAC)**.

The project follows modern backend engineering practices including:

- Layered Architecture
- Service Layer Pattern
- Custom Error Handling
- Async Handler Pattern
- API Response Wrapper
- Validation Middleware
- Authentication Middleware
- Enterprise Logging
- Rate Limiting
- Secure File Uploads
- Swagger API Documentation
---
```
New Authentication Flow Section
# 🔄 Refresh Token Rotation Flow

The project implements production-oriented Refresh Token Rotation for enhanced session security.

                User Login
                     |
                     ▼
      Generate Access & Refresh Tokens
                     |
                     ▼
         Hash Refresh Token (SHA-256)
                     |
                     ▼
          Store Hashed Token in MongoDB
                     |
                     ▼
      Send Plain Refresh Token as Cookie
                     |
                     ▼
              Access Token Expires
                     |
                     ▼
            POST /auth/refresh-token
                     |
                     ▼
             Verify Refresh Token
                     |
                     ▼
                  Find User
                     |
                     ▼
         Compare Hashed Refresh Token
                     |
                     ▼
                 Token Valid?
                     |
                    YES
                     |
                     ▼
         Generate New Access Token
                     |
                     ▼
         Generate New Refresh Token
                     |
                     ▼
          Replace Previous Refresh Token
                     |
                     ▼
           Store New Hashed Refresh Token
                     |
                     ▼
             Send New Tokens to Client
                     |
                     ▼
      Previous Refresh Token becomes Invalid
```


---

# ✨ Features

## 👤 Authentication

- User Registration
- Secure Login
- Logout
- JWT Authentication
- Refresh Token Authentication
- Refresh Token Rotation
- Email Verification
- Forgot Password
- Reset Password
- Current User Profile
- Change Password

---

## 👥 Role Based Access Control

Three-level permission system.

- 👑 Admin
- 🛠 Project Admin
- 👤 Member

Each API endpoint is protected using middleware-based authorization.

---

## 📁 Project Management

- Create Project
- Update Project
- Delete Project
- List Projects
- Project Details
- Project Members
- Invite Members
- Update Member Roles
- Remove Members

---

## ✅ Task Management

- Create Task
- Update Task
- Delete Task
- Assign Task
- Upload Attachments
- Change Status
- View Tasks

---

## 📋 Subtasks

- Create Subtask
- Update Subtask
- Delete Subtask
- Completion Tracking

---

## 📝 Notes

- Create Notes
- Update Notes
- Delete Notes
- View Notes

---

## 📂 File Upload

Supports multiple attachments using:

- Multer
- Cloudinary Ready
- MIME Validation
- File Size Limiting

---

## 🔐 Security

- JWT Authentication
- Refresh Tokens
- RBAC
- Helmet
- Joi Validation
- Express Rate Limiting
- Secure Cookies
- Password Hashing
- CORS
- Email Verification

---

## 📊 Logging

Production-ready logging using

- Winston
- Daily Rotate File
- Console Logger
- JSON Logs

---

## 📚 API Documentation

Integrated Swagger documentation for all endpoints.

---

## ⚡ Performance

- MongoDB Aggregation Pipelines
- Optimized Queries
- Connection Pooling
- Async Operations
- Fixed Window Rate Limiting

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Runtime | Node.js |
| Framework | Express.js 5 |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Authorization | Role Based Access Control |
| Validation | Joi |
| Documentation | Swagger |
| Logging | Winston |
| File Upload | Multer |
| Email | Nodemailer + Mailtrap |
| Security | Helmet |
| Rate Limiting | express-rate-limit |
| Testing | Jest *(Applied unit testing on auth)* |

---

# 📂 Project Highlights

✔ Clean Folder Structure

✔ MVC Architecture

✔ Service Layer

✔ Middleware-Based Authentication

✔ Middleware-Based Authorization

✔ Enterprise Error Handling

✔ Custom API Responses

✔ Centralized Logger

✔ Validation Layer

✔ Production Ready Configuration

✔ Email Service

✔ Secure Authentication

✔ Modular Codebase

✔ RESTful API Design

---

# 📑 Table of Contents

- About
- Features
- Tech Stack
- Installation
- Environment Variables
- Folder Structure
- Architecture
- Authentication
- Authorization
- API Endpoints
- Database Models
- Middleware
- Validation
- Logging
- Rate Limiting
- File Uploads
- Email Service
- Testing
- Deployment
- Future Improvements
- Contributing
- License
- Author

---

---

# 🚀 Installation

Follow the steps below to run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/abhimanyuBuilds/Project_Management.git
```

## 2. Navigate to the Project

```bash
cd Project_Management
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file in the project root.

Refer to the **Environment Variables** section below.

## 5. Start Development Server

```bash
npm run dev
```

## 6. Start Production Server

```bash
npm start
```

---

# 📦 Available Scripts

| Script | Description |
|---------|-------------|
| `npm run dev` | Starts development server using Nodemon |
| `npm start` | Starts production server |
| `npm test` | Runs Jest test suite |
| `npm run test:email` | Tests email service configuration |

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
# Server
SERVER_URL=
PORT=
NODE_ENV=

# Database
MONGODB_URI=

# JWT
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=

# CORS
CORS_ORIGIN=
CORS_ORIGIN2=
CORS_FRONTEND_ORIGIN=
FRONTEND_URL=

# Email
MAILTRAP_SMTP_HOST=
MAILTRAP_SMTP_PORT=
MAILTRAP_SMTP_USERNAME=
MAILTRAP_SMTP_PASSWORD=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=

# Rate Limiting
RATE_LIMIT_WINDOW=
RATE_LIMIT_MAX=
RATE_LIMIT_WINDOW1=
RATE_LIMIT_MAX1=
```

> **Important:** Never commit your `.env` file to GitHub. Keep all secrets private.

---

# 📁 Project Structure

```
Project_Management
│
├── public/
│   └── images/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── swagger/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── index.js
│
├── .env.example
├── package.json
├── README.md
└── .gitignore
```

---

# 📂 Folder Explanation

| Folder | Purpose |
|---------|----------|
| `config` | Application configuration |
| `controllers` | Handles request and response logic |
| `db` | MongoDB database connection |
| `middlewares` | Authentication, validation, rate limiting, uploads |
| `models` | Mongoose schemas |
| `routes` | REST API routes |
| `services` | Business logic such as logging |
| `swagger` | Swagger API documentation |
| `utils` | Helper utilities (API response, errors, email, async handler) |
| `validations` | Joi validation schemas |
| `public/images` | Uploaded task attachments |

---

# 🏗️ Project Architecture

The project follows a clean layered architecture that separates routing, business logic, validation, middleware, and database access.

```text
                Client
                   │
                   ▼
             Express Router
                   │
                   ▼
        Authentication Middleware
                   │
                   ▼
       Authorization Middleware
                   │
                   ▼
        Validation Middleware (Joi)
                   │
                   ▼
             Controller Layer
                   │
                   ▼
             Service Layer
                   │
                   ▼
            Mongoose Models
                   │
                   ▼
               MongoDB
```

---

# 🧩 Design Principles

This project is designed around modern backend engineering practices.

- Modular Architecture
- MVC Pattern
- Service Layer Pattern
- Reusable Middleware
- Centralized Error Handling
- Standardized API Responses
- Environment-based Configuration
- Scalable Folder Structure
- Secure Authentication
- RESTful API Design

---

# 📦 Core Dependencies

| Package | Purpose |
|----------|----------|
| Express.js | Backend Framework |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Joi | Request Validation |
| Multer | File Upload |
| Nodemailer | Email Service |
| Mailgen | Email Templates |
| Winston | Logging |
| Swagger | API Documentation |
| Helmet | Security Headers |
| Express Rate Limit | Rate Limiting |
| Cloudinary | Cloud Storage |
| Bcrypt | Password Hashing |

---

# 🧪 Testing

The project already includes a Jest configuration and an email testing script.

### Current

- Jest setup
- Email service testing
- Modular architecture designed for testing

### Planned

The following testing will be added in future releases:

- ✅ Unit Testing using Jest
- ✅ Integration Testing using Jest
- ✅ Controller Tests
- ✅ Authentication Tests
- ✅ Middleware Tests
- ✅ Validation Tests
- ✅ API Endpoint Tests
- ✅ Database Tests
- ✅ Test Coverage Reports
- ✅ CI/CD Test Automation

The architecture has been intentionally designed to make future automated testing straightforward and maintainable.

---

# 📈 Scalability

The backend is structured so that additional features can be integrated with minimal changes.

Future enhancements may include:

- Redis Caching
- Docker Support
- CI/CD Pipelines
- Background Jobs
- Queue Management
- WebSockets
- Notifications
- Activity Logs
- API Versioning
- Microservice Migration
- Performance Monitoring
- Advanced Search