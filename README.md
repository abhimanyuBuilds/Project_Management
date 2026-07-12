# Project_Management
<div align="center">

# 🚀 Project Camp Backend

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

# ✨ Features

## 👤 Authentication

- User Registration
- Secure Login
- Logout
- JWT Authentication
- Refresh Token Authentication
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
| Testing | Jest *(planned for Unit & Integration Testing)* |

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