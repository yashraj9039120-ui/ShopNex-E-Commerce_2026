# NeuroMart Server

![build-badge](https://img.shields.io/badge/build-passing-brightgreen) ![version-badge](https://img.shields.io/badge/version-1.0.0-blue) ![license-badge](https://img.shields.io/badge/license-MIT-lightgrey)

> **NeuroMart — Backend**
>
> A production-ready Node.js + Express server for the NeuroMart e‑commerce project. This README includes quick setup, API reference, common commands, and animated demo placeholders (replace with your own GIFs/screenshots).

---

## 🔥 Animated Demo (replace with your GIF)

> Add an animated GIF or short video showing the server starting, API requests in Postman, or a demo of the checkout flow.

```md
!(./assets/demo.gif)
```

> Or use a hosted GIF URL:

```md
![Server Demo Hosted](https://media.giphy.com/media/your-gif-id/giphy.gif)
```

---

## 🚀 Features

* RESTful API built with Express.js
* Authentication (JWT)
* Product, Cart, Order management
* Payment integration (Razorpay example flow)
* Input validation & error handling
* MongoDB (Mongoose) for data persistence
* Environment-based configuration
* Ready for Docker + CI pipelines

---

## 📁 Repo Structure

```
neuro-mart-server/
├─ src/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ middlewares/
│  ├─ utils/
│  └─ app.js
├─ config/
│  └─ config.env.example
├─ test/
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
└─ README.md
```

---

## ⚙️ Requirements

* Node.js >= 18
* npm or yarn
* MongoDB (local or Atlas)
* (Optional) Docker

---

## 🛠️ Quick Start

1. Clone the repo

```bash

cd NeuroMart_Server
```

2. Install dependencies

```bash
npm install
# or
# yarn
```

3. Create a `.env` file from the example

```bash
cp config/config.env.example config/config.env
# then edit config/config.env with your values
```

4. Run in development

```bash
npm run dev
# (uses nodemon, auto-restarts on change)
```

5. Sample curl (health check)

```bash
curl http://localhost:5000/api/v1/health
```

---

## 🔐 Environment Variables (`env.example`)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/neuro_mart
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES=7d
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
FRONTEND_URL=http://localhost:3000
```

> **Security tip:** Never commit `config/config.env` to source control. Add it to `.gitignore`.

---

## 🧭 API Endpoints (summary)

> Replace or extend endpoints to match your implementation.

| Method | Route                         | Description                     |
| ------ | ----------------------------- | ------------------------------- |
| GET    | `/api/v1/health`              | Health check                    |
| POST   | `/api/v1/auth/register`       | Create a user                   |
| POST   | `/api/v1/auth/login`          | Login & receive JWT             |
| GET    | `/api/v1/products`            | List products                   |
| GET    | `/api/v1/products/:id`        | Get product details             |
| POST   | `/api/v1/cart`                | Add to cart (auth)              |
| POST   | `/api/v1/order`               | Place an order (auth)           |
| POST   | `/api/v1/payment/process`     | Create payment order (Razorpay) |
| POST   | `/api/v1/paymentVerification` | Verify payment signature        |

---

## 💳 Payment Flow (Razorpay example)

1. Client calls `/payment/process` with amount and receives an order object.
2. Client opens Razorpay checkout with `order_id`.
3. Razorpay returns `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`.
4. Client posts these to `/paymentVerification` to verify and finalize order.

---

## 🧪 Testing

* Use Postman or Insomnia to test endpoints.
* Example test script (npm)

```json
"scripts": {
  "test": "jest --runInBand",
  "dev": "nodemon src/app.js",
  "start": "node src/app.js"
}
```

---

## 🐳 Docker

**Dockerfile (example)**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "src/app.js"]
```

**docker-compose.yml (example)**

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    env_file:
      - config/config.env
    depends_on:
      - mongodb
  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```

---

## ♻️ Common Git Commands

```bash
# Pull remote changes and merge
git pull origin main

# Add, commit, and push
git add .
git commit -m "feat: add README with animated demo"
git push origin main
```

If you see `! [rejected] main -> main (fetch first)` error, run:

```bash
git pull origin main
# resolve conflicts if any
git push origin main
```

---

## 🙋 Contribution

1. Fork the repo
2. Create a branch: `git checkout -b feat/awesome-feature`
3. Commit your changes: `git commit -m "feat: add ..."`
4. Push to your branch and open a PR

---

## 📬 Contact

* Author: Ujjval
* Repo: `NeuroMart_Server`
* Email: ujjvalpateliya@gmail.com

---

## 📝 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

> *Tip:* To make the README more animated on GitHub, add a short GIF under `/assets` and reference it in the markdown (GitHub will auto-play it inline). You can also include animated SVG badges from [shields.io](https://shields.io). Replace placeholders above with your actual GI
