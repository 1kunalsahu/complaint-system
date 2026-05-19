# Requirements Extracted From ESE Paper

## Project Title

AI-Based Smart Complaint Management System

## Case Study

Design and implement a MERN Stack application that allows users to register complaints online. The system should use AI APIs to classify complaint priority, generate automated responses, and recommend the concerned department.

## Application Support

- Complaint registration
- Complaint tracking
- AI-based complaint categorization
- Secure authentication
- Deployment on Render

## Frontend Requirements

- Complaint Registration Form
- Complaint List Page
- Complaint Status Update Page
- AI Analysis Result Display

Complaint fields:

- Name
- Email
- Complaint Title
- Complaint Description
- Complaint Category
- Location
- Complaint Status

Complaint tracking:

- View all complaints
- Filter complaints by category
- Update complaint status
- Search complaints by location

AI-based complaint analysis:

- Detect complaint urgency
- Suggest responsible department
- Generate automatic response message
- Summarize complaint

## Backend Requirements

- RESTful APIs
- Controllers and routes
- Middleware
- Validation and error handling

Required endpoints:

- `POST /api/complaints`
- `GET /api/complaints`
- `PUT /api/complaints/:id`
- `GET /api/complaints/search?location=Ghaziabad`
- `POST /api/ai/analyze`

## MongoDB Schema

The complaint schema includes name, email, title, description, category, location, status, and created date. This project also adds user reference, timestamps, and AI analysis fields.

## Authentication

- Signup
- Login
- JWT protected routes
- bcrypt password hashing

## Deployment

- Frontend: Render Static Site
- Backend: Render Web Service
- Database: MongoDB Atlas
