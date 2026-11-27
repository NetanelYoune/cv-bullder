# CV Builder — Full-Stack Resume Application

## Project Overview

CV Builder is a full-stack web application developed as a software engineering semester project.

The application allows users to create, edit, save, and preview their resumes through a web interface.

The project demonstrates frontend development with React, backend API development with Node.js and Express, and communication between client and server.

## Technologies Used

| Component | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite |
| Backend | Node.js, Express |
| Routing | React Router |
| State Management | React Context API |
| API Communication | Fetch API, REST |
| Automation Practice | Jenkins Pipeline |
| Version Control | Git, GitHub |

## Features

- Create and edit resume information.
- Add personal details, including name, email, and phone.
- Write a professional summary.
- Add, edit, and remove work experience entries.
- View a live preview while editing.
- Save resume data through the backend API.
- Retrieve saved resume data for preview.
- Preserve editor state in browser localStorage.
- Generate template-based suggestions for professional summaries.

## Application Architecture

The application is divided into two main components:

**Frontend (`client/`)**

A React application providing resume editing, navigation, state management, and preview functionality.

**Backend (`server/`)**

An Express REST API handling resume storage, retrieval, health checks, and text improvement endpoints.

The frontend communicates with the backend using HTTP requests.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend availability |
| POST | `/api/cv/save` | Save resume information |
| GET | `/api/cv` | Retrieve the saved resume |
| POST | `/api/improve-summary` | Generate a template-based summary |
| POST | `/api/improve-experience` | Generate a template-based experience description |

## Running the Project Locally

### Prerequisites

- Node.js and npm

### Start the Backend

From the repository root:

```bash
cd server
npm install
npm run dev
```

The backend runs on `http://localhost:5000`.

### Start the Frontend

Open a separate terminal and run:

```bash
cd client
npm install
npm run dev
```

Open the local address displayed by Vite to access the application.

## Jenkins Practice

The repository also includes a basic `Jenkinsfile` demonstrating a declarative Jenkins Pipeline.

The pipeline accepts two numeric parameters, calculates their sum, and prints the result.

This is an introductory Jenkins automation exercise, not a complete CI/CD deployment pipeline.

## Current Limitations

- Backend resume data is stored in memory and is lost when the server restarts.
- The frontend also uses browser localStorage to preserve editing state.
- The text improvement endpoints use predefined templates rather than an external AI model.
- The frontend API URL is currently configured for local development.
- No production deployment is documented.

## Future Improvements

- Add persistent database storage.
- Support exporting resumes to PDF.
- Add authentication and user accounts.
- Introduce automated API and frontend tests.
- Add Docker support and an application CI pipeline.
- Improve configuration for production environments.

## Project Purpose

This project was created to practice full-stack development, REST API integration, React state management, and basic Jenkins automation.

It demonstrates practical experience building and connecting frontend and backend components.
