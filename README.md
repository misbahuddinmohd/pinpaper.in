# PinPaper.in

Welcome to **PinPaper.in**, a full-stack web application designed to deliver seamless e-commerce experiences. This project is built with cutting-edge technologies and follows best practices for scalability, maintainability, and performance.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Frontend](#frontend)
5. [Backend](#backend)
6. [Setup Instructions](#setup-instructions)
7. [Contributing](#contributing)
8. [License](#license)

---

## Overview

PinPaper.in is an e-commerce platform that provides users with a rich shopping experience. It is built with a robust backend, a responsive and interactive frontend, and state-of-the-art tools for performance optimization. The platform integrates third-party services for SMS, email notifications, and payment processing.

---

## Features

- **User Authentication:** Secure login and signup using JWT.
- **Cart Management:** Add, update, and remove items from the cart efficiently.
- **Order Management:** Streamlined order processing with optimized pipelines.
- **Notifications:** SMS and email notifications for various user actions.
- **Payment Integration:** Ongoing integration with Cashfree for seamless payments.
- **High Performance:** Leveraging Redis for caching and MongoDB for database operations.

---

## Technologies Used

### Frontend
- **React.js**: A powerful JavaScript library for building user interfaces.
- **Context API**: Simplifies state management across components.

### Backend
- **Node.js & Express.js**: Provides a scalable and flexible backend architecture.
- **MongoDB**: A NoSQL database using discriminators and optimal pipelines for efficient data retrieval.
- **Redis**: Used for caching frequently accessed data.
- **Twilio**: Handles email notifications.
- **Fast2SMS**: Sends OTPs for user verification.
- **Cashfree**: Payment gateway integration (currently in development).
- **JWT (JSON Web Tokens)**: Ensures secure authentication.

---

## Frontend

The frontend is built using **React.js**, offering a modern and responsive user interface.

### Key Highlights:
- **State Management**: Utilizes the Context API for centralized state management, making the application scalable and easier to maintain.
- **Component-Based Architecture**: Ensures reusable and modular components.
- **Responsive Design**: Adapts seamlessly across devices for an optimal user experience.

---

## Backend

The backend is powered by **Node.js** and **Express.js**, ensuring fast and reliable server-side processing.

### Key Features:
- **Database Operations**: MongoDB discriminators and optimized pipelines for handling orders and cart data efficiently.
- **Caching**: Implements Redis for caching frequently accessed data, reducing database load and improving response times.
- **Email Service**: Twilio integration for sending user notifications and updates via email.
- **OTP Management**: Fast2SMS service for secure OTP generation and delivery.
- **Payment Gateway**: Cashfree integration (under development) for processing payments securely.
- **Authentication**: Secure user authentication using JWT.

---

## Setup Instructions

### Prerequisites:
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **Redis**
- API keys for Twilio, Fast2SMS, and Cashfree

### Steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/misbahuddinmohd/pinpaper.in.git
   cd pinpaper.in
   ```

2. **Install Dependencies**
   ```bash
   # For Backend
   cd backend
   npm install

   # For Frontend
   cd ../frontend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the `backend` directory with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   REDIS_URI=your_redis_connection_string
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   FAST2SMS_API_KEY=your_fast2sms_api_key
   CASHFREE_API_KEY=your_cashfree_api_key
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**
   ```bash
   # Start Backend
   cd backend
   node server.js

   # Start Frontend
   cd ../frontend
   npm start
   ```

5. **Access the Application**
   Open your browser and navigate to `http://localhost:3000` (default frontend port).

---

## Contributing

We welcome contributions to improve PinPaper.in! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and test thoroughly.
4. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out PinPaper.in! We hope you enjoy using it as much as we enjoyed building it.

