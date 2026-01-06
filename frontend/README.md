# Frontend Application Documentation

## 📌 Features Overview

- User authentication (Login/Register)
- Admin dashboard
- Loan application submission
- Collateral management interface
- Real-time loan status tracking
- Partner integration dashboard
- Responsive design
- Form validation
- Protected routes

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **UI Components**: shadcn/ui
- **Authentication**: JWT tokens 

---

## Prerequisites

- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun
- Backend API running on `http://localhost:5000`

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=1Fi Loan Platform
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   ├── user/
│   │   └── partner/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── forms/
│   ├── layout/
│   └── shared/
├── lib/
│   ├── api/
│   ├── utils/
│   └── validations/
├── hooks/
│   ├── useAuth.ts
│   └── useLoanApplications.ts
├── context/
│   └── AuthContext.tsx
├── types/
│   └── index.ts
├── public/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 User Interface

### Pages

#### Public Pages
- **/** - Landing page
- **/login** - User/Admin login
- **/register** - User registration

#### User Dashboard
- **/user/dashboard** - Overview of loans and applications
- **/user/apply** - Loan application form
- **/user/collaterals** - Manage mutual fund collaterals
- **/user/applications** - View all loan applications
- **/user/loans** - Active loans

#### Admin Dashboard
- **/admin/dashboard** - Admin overview
- **/admin/applications** - Review loan applications
- **/admin/applications/:id** - Evaluate specific application
- **/admin/partners** - Manage fintech partners
- **/admin/products** - Loan product configuration

#### Partner Dashboard
- **/partner/dashboard** - Partner overview
- **/partner/applications** - Submit applications via API

---

## 🔐 Authentication Flow

### User/Admin Login

1. User enters email and password
2. Frontend sends `POST /api/auth/login`
3. Backend validates credentials
4. JWT token stored in HTTP-only cookie
5. User redirected to appropriate dashboard

### Protected Routes

All dashboard routes are protected using middleware:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

---

**Route**: `/partner/dashboard`

**Features**:
- API key management
- Submit applications via API
- Webhook configuration
- Rate limit monitoring

---

## 🔄 API Integration

### Example API Calls

```typescript
// lib/api/loanApplications.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

export const createLoanApplication = async (data: LoanApplicationData) => {
  const response = await api.post('/loan-applications', data)
  return response.data
}

export const getLoanApplications = async () => {
  const response = await api.get('/loan-applications/me')
  return response.data
}

export const evaluateLoanApplication = async (id: string, decision: string) => {
  const response = await api.post(`/admin/loan-applications/${id}/evaluate`, {
    decision
  })
  return response.data
}
```

---

## 🔔 State Management

### Auth Context

```typescript
// context/AuthContext.tsx
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true
})

export const useAuth = () => useContext(AuthContext)
```

### Custom Hooks

```typescript
// hooks/useLoanApplications.ts
export const useLoanApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  return { applications, loading, refetch: fetchApplications }
}
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

---

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🔒 Security Best Practices

- JWT tokens
- CSRF protection
- Input sanitization
- XSS prevention
- Secure environment variables
- Role-based route protection

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: API connection error
```bash
# Solution: Check backend is running
cd ../backend
npm run dev
```

**Issue**: Build errors
```bash
# Solution: Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Additional Resources
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT
