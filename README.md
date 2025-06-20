# Grain Trading Platform

A comprehensive platform for grain trading, connecting farmers, suppliers, and buyers in the agricultural sector.

## Features

- User authentication and authorization
- Product catalog with grain listings
- Supplier directory
- Shopping cart functionality
- Order placement and tracking
- Admin dashboard for product and order management
- Password reset functionality

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion for animations
- Axios for API requests
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Stripe for payment processing

## Project Structure

```
grain-app/
├── frontend/         # React frontend application
├── backend/          # Node.js backend API
└── admin/            # Admin dashboard application
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/grain-app.git
   cd grain-app
   ```

2. Install dependencies for backend
   ```
   cd backend
   npm install
   ```

3. Install dependencies for frontend
   ```
   cd ../frontend
   npm install
   ```

4. Install dependencies for admin dashboard
   ```
   cd ../admin
   npm install
   ```

5. Set up environment variables
   - Create a `.env` file in the backend directory based on `.env.example`

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm start
   ```

2. Start the frontend application
   ```
   cd frontend
   npm start
   ```

3. Start the admin dashboard
   ```
   cd admin
   npm start
   ```

## License

[MIT](LICENSE)