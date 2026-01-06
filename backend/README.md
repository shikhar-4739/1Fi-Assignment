# Backend API Documentation

## 📌 Features Overview

- User & Admin authentication (JWT)
- Loan application management
- Mutual fund collateral management
- LTV-based loan approval engine
- Auto loan creation on approval
- Fintech partner APIs (API-key based)
- Partner webhooks for loan status updates
- Rate limiting per partner
- Swagger API documentation
- PostgreSQL + Prisma ORM

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon compatible)
- **Authentication**:
  - JWT (Users / Admin)
  - API Keys (Fintech Partners)
- **Docs**: Swagger / OpenAPI

---

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Database Setup

#### Run migrations

```bash
npm run migrate
# or
npx prisma migrate dev
```

#### Seed the database

```bash
npm run seed
```

### 5. Start the server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

---

## 📂 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🧱 Database Schema

### Core Models

- **User** – End users and admins
- **LoanProduct** – Loan configurations (interest rate, LTV)
- **LoanApplication** – Loan requests
- **Collateral** – Mutual fund collateral
- **Loan** – Approved loan contracts
- **FintechPartner** – Partner integrations

### Relationships

- A user can have multiple loan applications
- A loan application can have multiple collaterals
- A loan is created only after approval
- Partner-originated loans are traceable using `partnerId`

📄 **Full schema available in**: `prisma/schema.prisma`

---

## 📖 API Documentation (Swagger)

Swagger UI available at:

```
http://localhost:5000/api/docs
```

**Includes:**

- User APIs
- Admin APIs
- Partner APIs
- Request/response examples

---

## 🔐 Authentication

### User / Admin

JWT-based authentication

**Header:**
```
Authorization: Bearer <token>
```

### Fintech Partner

API-key based authentication

**Header:**
```
x-api-key: <partner-api-key>
```

---

## 🚀 API Endpoints

### 🔑 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### 👤 User
- `GET /api/users/me`

### 📝 Loan Applications (User)
- `POST /api/loan-applications`
- `GET /api/loan-applications/me`

### 💼 Collateral
- `POST /api/collaterals`
- `GET /api/collaterals`

### 🏦 Admin – Loan Decisions
- `GET /api/admin/loan-applications`
- `POST /api/admin/loan-applications/:id/evaluate`

### 🤝 Fintech Partner APIs
- `POST /api/partner/loan-applications`

### 🧩 Admin – Partner Management
- `POST /api/admin/partners`
- `GET /api/admin/partners`

---

## 📦 Example Responses

### Loan Application Created

```json
{
  "id": "uuid",
  "loanAmount": 300000,
  "status": "PENDING",
  "productId": "product-uuid"
}
```

### Loan Approved

```json
{
  "status": "APPROVED",
  "collateralValue": 600000,
  "eligibleAmount": 300000,
  "loan": {
    "id": "loan-uuid",
    "status": "ACTIVE"
  }
}
```

---

## 🔒 Security Considerations

- JWT validation middleware
- Role-based access control
- Partner-level rate limiting
- DB-level foreign key constraints
- Signed webhooks (HMAC)

---

## 🚀 Future Enhancements

- Margin call logic
- Loan repayment schedules
- Partner analytics dashboards
- Audit logs UI
- Event retry queues

---

## 📄 License

MIT
