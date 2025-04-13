# Cycle Mart Backend

This is the backend server for the Cycle Mart application, built with Node.js, Express, and MongoDB. It provides APIs for managing bicycles, users, orders, and authentication.

## Features

- **Authentication**: User registration, login, password change, and role-based access control.
- **Bicycle Management**: CRUD operations for bicycles, including image uploads to Cloudinary.
- **Order Management**: Place orders, verify payments, and manage shipping statuses.
- **Error Handling**: Centralized error handling with support for Zod, Mongoose, and custom errors.
- **Payment Integration**: Integrated with ShurjoPay for payment processing.
- **Pagination, Filtering, and Sorting**: Query builder for advanced data retrieval.
- **Admin Features**: Manage users, roles, and statuses.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Validation**: Zod
- **File Uploads**: Multer, Cloudinary
- **Payment Gateway**: ShurjoPay
- **Linting & Formatting**: ESLint, Prettier
- **TypeScript**: Strongly typed codebase

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Cloudinary account
- ShurjoPay sandbox/production credentials

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=<your_mongodb_connection_string>
BCRYPT_SALT_ROUNDS=8
JWT_ACCESS_SECRET=<your_jwt_secret>
JWT_ACCESS_EXPIRES_IN=1d

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# ShurjoPay
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=<your_shurjopay_username>
SP_PASSWORD=<your_shurjopay_password>
SP_PREFIX=SP
SP_RETURN_URL=<your_return_url>
```

## Installation

1. Clone the repository:

   ```sh
   git clone <repository_url>
   cd cycle-mart-server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables in the `.env` file.
```sh
   rename .env.example to .env
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```
 ```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user.
- `POST /api/auth/change-password`: Change user password.
- `PATCH /api/auth/update-user-status`: Update user status (admin only).
- `PATCH /api/auth/update-user-role`: Update user role (admin only).

### Bicycles

- `POST /api/bicycles/create-bicycle`: Create a new bicycle (admin only).
- `GET /api/bicycles`: Get all bicycles with filtering, sorting, and pagination.
- `GET /api/bicycles/:productId`: Get a single bicycle by ID.
- `PUT /api/bicycles/:productId`: Update a bicycle (admin only).
- `DELETE /api/bicycles/:productId`: Delete a bicycle (admin only).

### Orders

- `POST /api/orders/create-order`: Place a new order.
- `GET /api/orders/verify`: Verify payment.
- `GET /api/orders/revenue`: Get total revenue (admin only).
- `GET /api/orders/:id`: Get orders for a specific user.
- `GET /api/orders`: Get all orders (admin only).
- `PATCH /api/orders/update-status`: Update shipping status (admin only).

### Users

- `POST /api/users/create-admin`: Create a new admin user (admin only).
- `GET /api/users`: Get all users (admin only).
- `GET /api/users/:userId`: Get a single user by ID.
- `PUT /api/users/:userId`: Update a user (admin only).
- `DELETE /api/users/:userId`: Delete a user (admin only).

## Project Structure

```
src/
├── app/
│   ├── builder/          # Query builder for filtering, sorting, and pagination
│   ├── config/           # Configuration files
│   ├── errors/           # Custom error handling
│   ├── interface/        # TypeScript interfaces
│   ├── utils/            # Utility functions
├── middlewares/          # Express middlewares
├── modules/              # Feature modules (Auth, Bicycle, Order, User)
├── server.ts             # Entry point of the application
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project.
- `npm run start:prod`: Start the production server.
- `npm run lint`: Run ESLint.
- `npm run lint:fix`: Fix ESLint issues.
- `npm run format`: Format code with Prettier.

## Deployment

This project is configured for deployment on Vercel. The configuration is defined in the `vercel.json` file.

## License

This project is licensed under the ISC License.

## Contact

For any questions or issues, please contact the project maintainer.