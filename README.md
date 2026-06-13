# ShopNex E-Commerce 🛒

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=0ED9F7&center=true&vCenter=true&random=false&width=500&lines=Welcome+to+ShopNex;Modern+E-Commerce+Platform;MERN+Stack+Powered" alt="Typing SVG" />
</p>

A modern, full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). ShopNex provides a seamless shopping experience with intuitive product browsing, secure checkout, and comprehensive order management.

---

## ✨ Features

- 🔐 **User Authentication** - JWT-based secure authentication with bcrypt password hashing
- 🛍️ **Product Management** - Browse, search, filter, and categorize products
- 🛒 **Shopping Cart** - Add, remove, and manage items with persistence
- ❤️ **Wishlist** - Save favorite products for later
- 💳 **Payments Integration** - Secure payment processing with Stripe/Razorpay
- 📦 **Order Management** - Track and manage orders with status updates
- 👑 **Admin Dashboard** - Add, edit, and delete products (Admin-only)
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- ⭐ **Product Reviews** - Share and read customer feedback
- 🔍 **Advanced Search & Filter** - Find products with ease

---

## 🛠️ Tech Stack

### Frontend
| Component | Technology |
|-----------|------------|
| **Framework** | React.js 18+ |
| **State Management** | Redux Toolkit / Context API |
| **Styling** | Tailwind CSS / Material UI |
| **HTTP Client** | Axios |
| **Routing** | React Router v6 |

### Backend
| Component | Technology |
|-----------|------------|
| **Runtime** | Node.js 14+ |
| **Framework** | Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT + bcrypt |
| **Payment** | Stripe / Razorpay |

### Tools & Services
- **Version Control** - Git & GitHub
- **Package Manager** - npm / yarn
- **Development** - Nodemon
- **Containerization** - Docker (optional)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** or **yarn** - Included with Node.js
- ✅ **MongoDB** - [Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- ✅ **Git** - [Download](https://git-scm.com/)

---

## 🚀 Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/yashraj9039120-ui/ShopNex-E-Commerce_2026.git
cd ShopNex-E-Commerce_2026
```

### Step 2: Install Dependencies

#### Frontend Setup
```bash
cd client
npm install
```

#### Backend Setup
```bash
cd server
npm install
```

### Step 3: Environment Configuration

#### Backend (.env file in `server/` directory)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopnex
MONGO_DB_NAME=shopnex

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRE=7d

# Payment Integration
STRIPE_API_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email (Optional)
SMTP_SERVICE=gmail
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

#### Frontend (.env file in `client/` directory)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Step 4: Start the Application

#### Terminal 1 - Start Backend
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on: **http://localhost:5000**

#### Terminal 2 - Start Frontend
```bash
cd client
npm start
```

Frontend will run on: **http://localhost:3000**

---

## 📁 Project Structure

```
ShopNex-E-Commerce_2026/
│
├── client/                          # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API services
│   │   ├── store/                   # Redux store
│   │   ├── styles/                  # Global styles
│   │   ├── utils/                   # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── server/                          # Backend (Node.js + Express)
│   ├── models/                      # MongoDB schemas
│   ├── controllers/                 # Route controllers
│   ├── routes/                      # API routes
│   ├── middleware/                  # Custom middlewares
│   ├── config/                      # Configuration files
│   ├── utils/                       # Utility functions
│   ├── server.js
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication & Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Only authenticated users can access certain endpoints
- **CORS**: Cross-Origin Resource Sharing configured for security
- **Environment Variables**: Sensitive data stored in `.env` files

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | User login with JWT |
| GET | `/auth/logout` | User logout |
| GET | `/auth/me` | Get current user profile |

### Product Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get product details | No |
| POST | `/products` | Create new product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |
| GET | `/products/category/:category` | Get products by category | No |

### Cart Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/cart` | Get user's cart | Yes |
| POST | `/cart` | Add item to cart | Yes |
| PUT | `/cart/:itemId` | Update cart item | Yes |
| DELETE | `/cart/:itemId` | Remove item from cart | Yes |

### Order Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/orders` | Create new order | Yes |
| GET | `/orders` | Get user's orders | Yes |
| GET | `/orders/:id` | Get order details | Yes |
| PUT | `/orders/:id` | Update order status | Admin |
| GET | `/orders/admin/all` | Get all orders | Admin |

### Payment Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/payment/process` | Process payment | Yes |
| POST | `/payment/verify` | Verify payment | Yes |

---

## 💳 Payment Integration

### Razorpay Flow
1. User initiates checkout
2. Backend creates Razorpay order
3. Frontend opens Razorpay checkout modal
4. User completes payment
5. Payment signature is verified
6. Order is created in database

### Stripe Flow
1. User initiates checkout
2. Backend creates Stripe checkout session
3. User is redirected to Stripe
4. Payment confirmation webhook is received
5. Order is created in database

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Testing Tools
- Jest for unit testing
- Supertest for API testing
- Postman for manual API testing

---

## 📦 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
# Build for production
cd client
npm run build

# Deploy to Vercel (install vercel-cli first)
npm i -g vercel
vercel
```

### Backend Deployment (Heroku/Railway)

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository 🍴
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=5001 npm start
```

### MongoDB Connection Issues
- ✅ Verify MongoDB is running: `mongosh` or check MongoDB Atlas
- ✅ Check connection string in `.env`: `mongodb+srv://username:password@cluster.mongodb.net/database`
- ✅ Ensure firewall allows MongoDB connection
- ✅ Verify username and password are correct

### Frontend Not Loading
- ✅ Clear browser cache: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- ✅ Check if backend is running on http://localhost:5000
- ✅ Verify `REACT_APP_API_URL` in `.env`
- ✅ Check browser console for errors: `F12`

### JWT Token Issues
- ✅ Ensure `JWT_SECRET` is set in `.env`
- ✅ Check token expiration time
- ✅ Clear browser localStorage and login again

---

## 📚 Resources & Documentation

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Stripe Documentation](https://stripe.com/docs)
- [Razorpay Documentation](https://razorpay.com/docs/)

---

## 📧 Contact & Support

For questions or support, please reach out:

- **GitHub Issues**: [Report a bug](https://github.com/yashraj9039120-ui/ShopNex-E-Commerce_2026/issues)
- **GitHub Discussions**: [Start a discussion](https://github.com/yashraj9039120-ui/ShopNex-E-Commerce_2026/discussions)

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped with this project
- Special thanks to the open-source communities:
  - React.js team
  - Node.js & Express.js team
  - MongoDB & Mongoose team
  - Redux team

---

<p align="center">
  <strong>Happy Shopping! 🛍️</strong>
  <br>
  Made with ❤️ by the ShopNex Team
  <br>
  <a href="https://github.com/yashraj9039120-ui/ShopNex-E-Commerce_2026">⭐ Star this repo if you found it helpful!</a>
</p>

---

**Last Updated**: June 2026
**Version**: 1.0.0
**Status**: 🟢 Active Development
