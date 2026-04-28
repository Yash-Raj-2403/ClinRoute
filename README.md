# ClinRoute - AI-Powered Hospital Triage & Clinical Workflow Platform

A comprehensive healthcare platform featuring AI-powered triage assessment, real-time consultations, and clinical workflow automation. Styled with a modern, Zocdoc-inspired design system.

## 🏥 Overview 2 

ClinRoute is a full-stack healthcare application that streamlines the patient journey from symptom submission to diagnosis. The platform features:they are given below :

- **AI-Powered Triage**: Intelligent symptom analysis and priority scoring
- **Patient Portal**: Easy symptom submission, consultation tracking, and health records
- **Doctor Dashboard**: Patient queue management, case review, and scheduling
- **Real-Time Communication**: Messaging and video consultations via Socket.IO
- **Secure & HIPAA-Ready**: JWT authentication, data encryption, and security best practices

## 🎨 Design System

The application follows a Zocdoc-inspired design with:

### Colors
- **Primary**: Teal (#319795)
- **Secondary**: Yellow (#FBBF24)
- **Neutrals**: Professional gray scale
- **Semantic**: Success, Warning, Error, Info colors

### Typography
- **Headings**: Plus Jakarta Sans
- **Body**: Inter
- **Code**: JetBrains Mono

## 📁 Project Structure

```
ClinRoute/
├── client/                      # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── common/         # Shared UI components
│   │   │   ├── doctor/         # Doctor-specific components
│   │   │   ├── patient/        # Patient-specific components
│   │   │   ├── landing/        # Landing page components
│   │   │   └── layout/         # Layout wrappers
│   │   ├── context/
│   │   │   └── AuthContext.js  # Authentication state
│   │   ├── pages/
│   │   │   ├── public/         # Public pages (Home, About, etc.)
│   │   │   ├── patient/        # Patient dashboard pages
│   │   │   └── doctor/         # Doctor dashboard pages
│   │   ├── styles/
│   │   │   └── index.css       # Global styles & design system
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Helper utilities
│   │   ├── App.js              # Main app with routing
│   │   └── index.js            # Entry point
│   └── package.json
│
└── server/                      # Node.js Backend
    ├── config/
    │   └── database.js         # MongoDB connection
    ├── controllers/
    │   ├── authController.js   # Authentication logic
    │   ├── userController.js   # User profile management
    │   ├── patientController.js# Patient operations
    │   ├── doctorController.js # Doctor operations
    │   ├── consultationController.js
    │   ├── appointmentController.js
    │   └── triageController.js # AI triage logic
    ├── middleware/
    │   ├── auth.js             # JWT authentication
    │   ├── errorHandler.js     # Error handling
    │   └── validate.js         # Request validation
    ├── models/
    │   ├── User.js             # User schema
    │   ├── Patient.js          # Patient profile
    │   ├── Doctor.js           # Doctor profile
    │   ├── Consultation.js     # Consultation/triage
    │   └── Appointment.js      # Appointments
    ├── routes/
    │   ├── auth.js             # Auth routes
    │   ├── users.js            # User routes
    │   ├── patients.js         # Patient routes
    │   ├── doctors.js          # Doctor routes
    │   ├── consultations.js    # Consultation routes
    │   ├── appointments.js     # Appointment routes
    │   └── triage.js           # Triage routes
    ├── server.js               # Express app entry
    ├── package.json
    └── .env.example            # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd ClinRoute
   ```

2. **Setup Backend**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your configuration
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**

   Edit `server/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/clinroute
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   ```

5. **Start Development Servers**

   Backend:
   ```bash
   cd server
   npm run dev
   ```

   Frontend (in new terminal):
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/health

## 📱 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with hero, features, and CTA
- **About** (`/about`) - Company information and team
- **How It Works** (`/how-it-works`) - Platform walkthrough
- **For Doctors** (`/for-doctors`) - Doctor benefits and signup
- **For Hospitals** (`/for-hospitals`) - Enterprise solutions
- **Security** (`/security`) - HIPAA compliance and security info
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration

### Patient Dashboard
- **Dashboard** (`/patient`) - Overview with stats and quick actions
- **New Consultation** (`/patient/consultation/new`) - Symptom submission
- **Consultations** (`/patient/consultations`) - History and active cases
- **Consultation Status** (`/patient/consultation/:id`) - Case details
- **Nearby Doctors** (`/patient/doctors-nearby`) - Find doctors
- **Reports** (`/patient/reports`) - Health records and documents

### Doctor Dashboard
- **Dashboard** (`/doctor`) - Overview with queue and schedule
- **Patient Queue** (`/doctor/queue`) - Priority-sorted patient list
- **Case View** (`/doctor/case/:id`) - Detailed case review
- **Appointments** (`/doctor/appointments`) - Calendar and scheduling
- **Profile** (`/doctor/profile`) - Professional profile management

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     # Register new user
POST   /api/auth/login        # Login
POST   /api/auth/logout       # Logout
GET    /api/auth/me           # Get current user
PUT    /api/auth/password     # Update password
POST   /api/auth/forgot       # Forgot password
PUT    /api/auth/reset/:token # Reset password
```

### Patients
```
GET    /api/patients/dashboard      # Patient dashboard
GET    /api/patients/me             # Get profile
PUT    /api/patients/me             # Update profile
GET    /api/patients/medical-history
PUT    /api/patients/medical-history
GET    /api/patients/records
POST   /api/patients/records
GET    /api/patients/documents
POST   /api/patients/documents
DELETE /api/patients/documents/:id
PUT    /api/patients/vitals
GET    /api/patients/nearby-doctors
GET    /api/patients/consultations
GET    /api/patients/prescriptions
```

### Doctors
```
GET    /api/doctors               # List all doctors (public)
GET    /api/doctors/:id           # Get doctor details (public)
GET    /api/doctors/:id/availability
GET    /api/doctors/dashboard     # Doctor dashboard
GET    /api/doctors/me            # Doctor profile
PUT    /api/doctors/me            # Update profile
GET    /api/doctors/queue         # Patient queue
GET    /api/doctors/cases/:id     # Get case details
PUT    /api/doctors/cases/:id/status
PUT    /api/doctors/cases/:id/diagnosis
POST   /api/doctors/cases/:id/prescription
POST   /api/doctors/cases/:id/tests
PUT    /api/doctors/schedule
GET    /api/doctors/analytics
```

### Consultations
```
POST   /api/consultations              # Start consultation
GET    /api/consultations/:id          # Get consultation
PUT    /api/consultations/:id          # Update
POST   /api/consultations/:id/messages # Add message
GET    /api/consultations/:id/messages
POST   /api/consultations/:id/video/start
POST   /api/consultations/:id/video/end
POST   /api/consultations/:id/feedback
PUT    /api/consultations/:id/close
PUT    /api/consultations/:id/cancel
```

### Appointments
```
POST   /api/appointments              # Book appointment
GET    /api/appointments/:id
PUT    /api/appointments/:id
PUT    /api/appointments/:id/cancel
PUT    /api/appointments/:id/confirm
PUT    /api/appointments/:id/complete
PUT    /api/appointments/:id/no-show
PUT    /api/appointments/:id/reschedule
GET    /api/appointments/my           # Patient appointments
GET    /api/appointments/doctor       # Doctor appointments
GET    /api/appointments/calendar
GET    /api/appointments/slots
```

### AI Triage
```
POST   /api/triage/analyze           # Analyze symptoms
GET    /api/triage/:id/insights      # Get triage insights
GET    /api/triage/analytics         # Triage analytics
POST   /api/triage/quick-check       # Quick triage (public)
PUT    /api/triage/:id               # Update assessment
```

## 🛡️ Security Features

- JWT-based authentication with HTTP-only cookies
- bcrypt password hashing
- Rate limiting on API endpoints
- Helmet.js security headers
- CORS configuration
- XSS protection
- Input validation and sanitization
- Role-based access control (RBAC)

## 🏗️ Technology Stack

### Frontend
- React 18
- React Router DOM 6
- Framer Motion (animations)
- Lucide React (icons)
- React Toastify (notifications)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO (real-time features)
- JWT (authentication)
- bcryptjs (password hashing)
- Express Validator

### DevOps
- Docker-ready
- Environment-based configuration
- Morgan logging
- Nodemon (development)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting a pull request.

---

Built with ❤️ for better healthcare
