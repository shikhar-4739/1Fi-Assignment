# LoanFi

**Loan Management System for Loan Against Mutual Funds (LAMF)**

LoanFi is a full-stack Loan Management System (LMS) designed for Loan Against Mutual Funds (LAMF). The platform supports users, NBFC admins, and fintech partners, enabling secure loan origination, collateral management, underwriting, approvals, and partner integrations.

The system is built with real-world fintech architecture principles, including partner APIs, rate limiting, webhooks, and transactional safety.

---

## 🚀 Key Capabilities

### 👤 Users

- Register and authenticate securely
- View loan products
- Apply for loans against mutual fund collateral
- Track loan application status
- View approved loans

### 🏦 Admin (NBFC / Operations)

- Manage loan products
- Review loan applications
- Evaluate collateral and LTV eligibility
- Approve or reject loan applications
- Auto-create loans on approval
- Monitor all loans and applications
- Onboard fintech partners

### 🤝 Fintech Partners

- Create loan applications via secure APIs
- Submit collateral details
- Access partner-scoped, rate-limited endpoints
- Receive real-time loan status updates via webhooks

---

## 🏗️ High-Level Architecture

```
Frontend (Next.js)
│
├── User Dashboard
├── Admin Dashboard
│
└── API Layer
     ↓
Backend (Node.js + Express)
│
├── Auth (JWT / API Keys)
├── Loan Engine
├── Collateral Engine
├── Partner APIs
├── Webhooks
│
└── PostgreSQL (Prisma ORM)
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + API Keys
- **Documentation**: Swagger/OpenAPI

---

## 📂 Project Structure

```
LoanFi/
├── frontend/          # Next.js application
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── README.md
│
├── backend/           # Express.js API
│   ├── prisma/
│   ├── src/
│   └── README.md
│
└── README.md          # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Quick Start

#### 1. Clone the repository

```bash
git clone <repository-url>
cd LoanFi
```

#### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file
echo "DATABASE_URL=postgresql://user:password@localhost:5432/loanfi" > .env
echo "JWT_SECRET=your_jwt_secret" >> .env
echo "PORT=5000" >> .env

# Run migrations and seed
npx prisma migrate dev
npm run seed

# Start backend server
npm run dev
```

Backend will run at `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd ../frontend
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start frontend server
npm run dev
```

Frontend will run at `http://localhost:3000`

---

## 📖 Documentation

- **Backend API**: See [backend/README.md](./backend/README.md)
- **Frontend**: See [frontend/README.md](./frontend/README.md)
- **API Documentation**: `http://localhost:5000/api/docs` (Swagger UI)

---

## 🔑 Key Features

### ✅ Loan Application Flow

1. User applies for a loan with mutual fund collateral
2. System calculates total collateral value
3. Admin reviews and evaluates LTV ratio
4. On approval, loan is auto-created
5. Partner receives webhook notification

### ✅ Collateral Management

- Add multiple mutual funds as collateral
- Real-time valuation tracking
- LTV calculation engine
- Collateral-to-loan mapping

### ✅ Partner Integration

- API-key based authentication
- Rate limiting per partner
- Webhook notifications
- Partner-scoped data access

### ✅ Security

- JWT authentication for users/admins
- API keys for partner access
- Role-based access control (RBAC)
- Database-level constraints
- Transaction safety

---

## 🧠 Notes for Reviewers

- Loan approval logic runs inside DB transactions for consistency
- Duplicate loan creation prevented at DB level
- Internal user IDs are never exposed to partners
- Architecture mirrors real NBFC & fintech systems
- Follows enterprise-grade patterns and best practices

---

## 🚀 Deployment

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

---

## 🔮 Future Enhancements

- Margin call logic for volatile collateral
- Loan repayment schedules and EMI tracking
- Partner analytics dashboards
- Audit logs and compliance UI
- Event retry queues for webhooks
- Multi-language support
- Mobile application

---

## 📄 License

This project is created for evaluation and demonstration purposes.

---

## 👤 Author

**Shikhar Varshney**  
Full-Stack Developer

- GitHub: https://github.com/shikhar-4739
- Email: shikhar.varshney2003@gmail.com

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ for the fintech ecosystem**