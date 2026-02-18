
# 🚀 NoteCapsuel

**A secure, minimalist workspace for your thoughts.**

**NoteCapsuel** is a production-ready, full-stack application designed for privacy and speed. By leveraging **httpOnly cookies** and **JWT**, it ensures that user data remains encapsulated and secure from common web vulnerabilities.

---

## ✨ Key Features

* **Secure Tunneling**: Authentication powered by JWT and stored in `httpOnly` cookies to prevent XSS attacks.
* **Encapsulated Data**: Strict user-specific data isolation; users can only interact with their own encrypted notes.
* **Responsive UI**: A mobile-first, sleek interface built with Tailwind CSS and Next.js.
* **State Management**: Efficient data fetching and synchronization between the client and the Express backend.
* **Production Guard**: Environment-specific security configurations (SameSite, Secure flags).

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB Atlas |
| **Security** | Bcrypt (Hashing), JWT (Auth), Cookie-Parser |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🔒 Security Architecture

NoteCapsuel prioritizes data integrity through a multi-layered security approach:

1. **Password Hashing**: Utilizing `bcrypt` with a salt factor of 10 to ensure zero-knowledge storage.
2. **JWT Strategy**: Stateless authentication that reduces server load while maintaining security.
3. **Cookie Lockdown**:
* `httpOnly`: Protects against XSS.
* `SameSite: Strict`: Mitigates CSRF risks.
* `Secure`: Ensures tokens are only transmitted over HTTPS.


4. **Route Guarding**: Custom Express middleware that validates the session before any CRUD operation.

---

## 📂 Project Structure

```text
notecapsuel/
├── client/          # Next.js frontend with Tailwind configuration
│   ├── src/app      # App router logic
│   └── src/components
├── server/          # Express.js backend
│   ├── middleware/  # Auth & error handling
│   ├── models/      # Mongoose schemas (User, Note)
│   └── routes/      # API endpoints
└── README.md

```

---

## ⚙️ Local Development

### 1. Prerequisites

* Node.js (v18+)
* MongoDB Atlas Account

### 2. Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/notecapsuel.git

# Install Backend Dependencies
cd server && npm install

# Install Frontend Dependencies
cd ../client && npm install

```

### 3. Environment Variables

Create a `.env` in the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
NODE_ENV=development
CLIENT_URL=http://localhost:3000

```

---

## 👨‍💻 Author

**Your Name**

* GitHub: [@sionnn9](https://github.com/sionnn9)
* LinkedIn: [Sion Lobo](https://www.linkedin.com/in/sionlobo/)
