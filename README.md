# MERN Apartment Rental System

College-level MERN stack apartment rental project.

## Features

### User
- Register/Login
- Dashboard
- Profile update
- Browse apartments
- Search/filter
- Apartment details
- Rental request
- Request status
- Security deposit demo payment
- Payment history
- Rental status

### Admin
- Separate admin login
- Dashboard statistics
- Add/Edit/Delete apartments
- View rental requests
- Accept/Deny requests
- View payments

## Requirements
- Node.js
- MongoDB Community Server OR MongoDB Atlas
- MongoDB Compass is optional for viewing/managing the database

## Run backend
```bash
cd backend
npm install
npm run dev
```

Backend: http://localhost:5000

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Admin
Username: admin
Password: admin123

Before login, create the admin with:
```http
POST http://localhost:5000/admin/create
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

## Database
Default local MongoDB:
mongodb://127.0.0.1:27017/apartment_rental

No JWT/authorization is used in this demo project.
The payment is a demo record; no real payment gateway is connected.
