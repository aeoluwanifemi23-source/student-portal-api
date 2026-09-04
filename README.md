# Student Portal API

A REST API for creating and managing student accounts, built with Node.js, Express, and MongoDB.

## Features
- Create a student account (name, registration number, email)
- Get a student's own details by ID
- Update a student profile (name and registration number ONLY — email is locked)
- Delete a student account

## Tech Stack
- Node.js
- Express
- MongoDB (via Mongoose)
- dotenv

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root (see `.env` example) with:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

3. Run the server:
   ```
   npm run dev
   ```
   or
   ```
   npm start
   ```

Server runs at `http://localhost:5000`.

## API Endpoints

Base URL: `/api/students`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/students` | Create a new student |
| GET    | `/api/students/:id` | Get a student's details by ID |
| PUT    | `/api/students/:id` | Update name/regNumber (email not allowed) |
| DELETE | `/api/students/:id` | Delete a student account |

### Create Student — POST /api/students
Body:
```json
{
  "name": "Nifemi Adeoye",
  "regNumber": "190405001",
  "email": "nifemi@unilag.edu.ng"
}
```

### Get Student — GET /api/students/:id
Returns the student's own record.

### Update Student — PUT /api/students/:id
Body (only these two fields allowed):
```json
{
  "name": "New Name",
  "regNumber": "190405002"
}
```
Including `email` in the body returns a `403` error.

### Delete Student — DELETE /api/students/:id
Permanently removes the student record.

## Testing with Postman
See the accompanying Postman setup guide for step-by-step instructions.
