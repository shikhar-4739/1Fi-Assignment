export interface registerUserResponse {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
}

export interface registerUserData {
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface loginUserData {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        partnerId: string | null;
        partnerCustomerId: string | null;
        createdAt: string;
    }
}

export interface loanApplicationData {
    id: string;
    loanAmount: number;
    status: string;
    productId: string;
    userId: string;
    tenure: number;
    createdAt: string;
    partnerId: string;
    partnerCustomerId: string;
    product: {
        id: string;
        name: string;
        interestRate: number;
        ltv: number;
        minAmount: number;
        maxAmount: number;
        createdAt: string;
    };
    user?: user[];
}

export interface user {
    id: string;
    name: string;
    email: string;
}

export interface createLoanApplicationData {
    productId: string;
    loanAmount: number;
    tenure: number;
}

export interface createLoanApplicationResponse {
    id: string;
    loanAmount: number;
    status: string;
    productId: string;
    userId: string;
    tenure: number;
    createdAt: string;
    partnerId: string | null;
    partnerCustomerId: string | null;
}

export interface evaluateLoanApplicationResponse {
    message: string;
    result: {
        status: string;
        collateralValue: number;
        eligibleAmount: number;
        loan: {
            id: string;
            loanApplicationId: string;
            userId: string;
            outstandingAmount: number;
            interestRate: number;
            tenure: number;
            status: string;
            createdAt: string;
            partnerId: string | null;
            partnerCustomerId: string | null;
        }
    }
}

export interface getLoanProductData {
    id?: string;
    name: string;
    interestRate: number;
    ltv: number;
    minAmount: number;
    maxAmount: number;
    createdAt?: string;
}

export interface addCollateralData {
    loanApplicationId: string;
    fundName: string;
    isin: string;
    units: number;
    nav: number;
}

export interface addCollteralResponse {
    id: string;
    fundName: string;
    isin: string;
    units: number;
    nav: number;
    loanApplicationId: string;
    partnerId: string | null;
    partnerCustomerId: string | null;
    createdAt: string;
}


export interface approvedLoansData {
    id: string;
    loanApplicationId: string;
    userId: string;
    outstandingAmount: number;
    interestRate: number;
    tenure: number;
    status: string;
    createdAt: string;
    partnerId: string | null;
    partnerCustomerId: string | null;
    user: user;
    loanApplication: loanApplicationData;
}

export interface getPartnerData {
    id: string;
    name: string;
    isActive: boolean;
    rateLimitPerMin: number;
    apiKey: string;
    createdAt: string;
}

export interface CreateFintechPartnerResponse {
  message: string
  partner: {
    id: string
    name: string
    apiKey: string
  }
}