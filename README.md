# Task Management Web Application

This repository contains the code for a Task Management Web Application, which includes a frontend and a backend. The application allows users to manage tasks, including creating, updating, and deleting them. Additionally, it provides a user authentication system (bonus feature) and can be deployed to a cloud provider (bonus feature).

## Table of Contents
- [Requirements](#requirements)
- [Features](#features)
- [Installation](#installation)

## Requirements

To successfully complete this project, I completed the following requirements:

### Backend API

- Create a RESTful API or a GraphQL API to manage tasks.
- Implement the following endpoints:
  - `GET /tasks`: Fetch all tasks.
  - `GET /tasks/:id`: Fetch a single task by ID.
  - `POST /tasks`: Add a new task.
  - `PUT /tasks/:id`: Update a task by ID.
  - `DELETE /tasks/:id`: Delete a task by ID.
- Use persistent data storage (e.g., a relational database, NoSQL database, or an ORM like SQLAlchemy for Python).
- Include error handling for incorrect route access or invalid data inputs.

### Frontend

- Use a frontend framework or library (e.g., React, Vue, Angular).
- Implement the following views/pages:
  - List View: Display all tasks with the ability to delete a task.
  - Details View: Display details of a single task.
  - Add/Edit View: A form to add a new task or edit an existing one.
- Implement responsive design (either using a framework like Bootstrap, Tailwind, or manual CSS).
- Connect the frontend to the backend API to perform CRUD operations.

### Authentication

- Implement a simple user authentication system.
- Users should be able to register, log in, and log out.
- Only logged-in users can create, update, or delete tasks.

## Features

- **Task Management:** Create, read, update, and delete tasks.
- **User Authentication:** Register, log in, and log out users. Only authenticated users can manage tasks.
- **Responsive Design:** The application is designed to work well on various screen sizes.
- **Deployment:** The application is deployed and accessible online ([MERN Task Management App](https://mern-task-management-client.vercel.app/)).
- **Tech Stack:** MERN stack with TailwindCSS

## Installation

To run this application locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd task-management-app
   ```

3. Install dependencies for the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd client
   npm install # or yarn install

   # Install backend dependencies
   cd ../server
   npm install # or yarn install
   ```

4. Configure the environment variables for the backend:
   - Create a `.env.development` file in the `server` directory containing
     ```
       ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, DATABASE_URL = mongodb://localhost:27017/mern-task-management, and FRONTEND_URL
     ```
   - Create a `.env` file in the `client` directory containing
     ```
       REACT_APP_BASE_API_URL
     ```

5. Run the backend and frontend applications:

   ```bash
   # In the backend directory
   npm start # or yarn start

   # In the frontend directory
   npm start # or yarn start
   ```

7. The application should now be running. Access it in your web browser at `http://localhost:3000`
