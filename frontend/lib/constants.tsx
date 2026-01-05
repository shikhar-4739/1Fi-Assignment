export const navItems = [
    {
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      href: "/dashboard",
    },
    {
      label: "Approved Loans",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      href: "/dashboard/approved-loans",
    },
    {
      label: "Applications",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      href: "/dashboard/all-application",
    },
    {
      label: "New Application",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      href: "/dashboard/new-application",
    },
    {
      label: "Partners",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      href: "/dashboard/partners",
    },
    {
      label: "API Integrations",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      href: "/dashboard/developer",
    },
    {
      label: "Analytics",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      href: "/dashboard/analytics",
    },
    {
      label: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      href: "/dashboard/settings",
    },
  ];


export const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      disbursed: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };


export const endpoints = [
    {
      method: 'POST',
      path: '/api/auth/register',
      title: 'User Registration',
      description: 'Register a new user account',
      auth: false,
      request: {
        name: 'string',
        email: 'string',
        password: 'string',
        role: 'USER | ADMIN'
      },
      response: {
        message: 'User registered successfully',
        token: 'jwt-token',
        user: {
          id: 'uuid',
          name: 'string',
          email: 'string',
          role: 'string'
        }
      }
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      title: 'User Login',
      description: 'Authenticate and get access token',
      auth: false,
      request: {
        email: 'string',
        password: 'string'
      },
      response: {
        message: 'Login successful',
        token: 'jwt-token',
        user: { id: 'uuid', name: 'string', email: 'string' }
      }
    },
    {
      method: 'GET',
      path: '/api/loan-applications',
      title: 'Get All Loan Applications',
      description: 'Retrieve all loan applications',
      auth: true,
      request: null,
      response: {
        applications: '[array of loan applications]'
      }
    },
    {
      method: 'POST',
      path: '/api/loan-applications',
      title: 'Create Loan Application',
      description: 'Submit a new loan application',
      auth: true,
      request: {
        userId: 'uuid',
        productId: 'uuid',
        loanAmount: 'number',
        tenure: 'number'
      },
      response: {
        message: 'Loan application created',
        application: { id: 'uuid', status: 'PENDING' }
      }
    },
    {
      method: 'GET',
      path: '/api/approved-loans',
      title: 'Get Approved Loans',
      description: 'Retrieve all approved loans',
      auth: true,
      request: null,
      response: {
        loans: '[array of approved loans]'
      }
    },
    {
      method: 'POST',
      path: '/api/partners/add-new',
      title: 'Create Partner (Admin)',
      description: 'Create a new fintech partner',
      auth: true,
      request: {
        name: 'string'
      },
      response: {
        message: 'Partner created successfully',
        partner: { id: 'uuid', name: 'string', apiKey: 'string' }
      }
    },
    {
      method: 'GET',
      path: '/api/partners',
      title: 'Get All Partners (Admin)',
      description: 'Retrieve all fintech partners',
      auth: true,
      request: null,
      response: {
        partners: '[array of partners]'
      }
    },
    {
      method: 'POST',
      path: '/api/partners/loan-application',
      title: 'Partner Loan Application',
      description: 'Create loan application via partner API',
      auth: 'API Key',
      request: {
        userId: 'uuid',
        productId: 'uuid',
        loanAmount: 'number'
      },
      response: {
        message: 'Loan application created via partner',
        application: { id: 'uuid' }
      }
    }
  ];

export const codeExamples = {
    javascript: `// Using Fetch API
const response = await fetch('https://api.loanfi.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
console.log(data);`,
    
    curl: `curl -X POST https://api.loanfi.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'`,
    
    python: `import requests

url = "https://api.loanfi.com/api/auth/login"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_JWT_TOKEN"
}
data = {
    "email": "user@example.com",
    "password": "password123"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`
  };