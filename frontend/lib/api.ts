import { addCollateralData, addCollteralResponse, approvedLoansData, CreateFintechPartnerResponse, createLoanApplicationData, createLoanApplicationResponse, evaluateLoanApplicationResponse, getLoanProductData, getPartnerData, loanApplicationData, loginUserData, registerUserData, registerUserResponse } from "@/types/interface";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface ApiResponse<T> {
  data: T
  status: number
}

export async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET",
  data?: any
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {};

  const token = localStorage.getItem("token");
  console.log(token, 'token from local storage');
  if (token) {
    try {
      headers["Authorization"] = `Bearer ${token}`;
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }

  const isFormData = data instanceof FormData;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    method,
    url,
    headers,
    data: isFormData ? data : JSON.stringify(data),
  };

  try {
    const response = await axios(config);

    return {
      data: response.data as T,
      status: response.status
    }
  } catch (error: any) {
    console.log(error, 'Main api response')
    if (error.response) {
      const errorMessage = error.response.data?.message || `API request failed with status ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No response received from API.");
    } else {
      throw new Error(`Error in API request: ${error.message}`);
    }
  }
}

export async function registerUser( data: registerUserData): Promise<ApiResponse<registerUserResponse>> {
  return apiRequest<registerUserResponse>("/api/auth/register","POST",data);
};

export async function loginInUser( data: { email: string; password: string; }): Promise<ApiResponse<loginUserData>> {
  return apiRequest<loginUserData>("/api/auth/login","POST",data);
}

export async function getAllLoanApplications(): Promise<ApiResponse<loanApplicationData[]>> {
  return apiRequest<loanApplicationData[]>("/api/loan-application/all","GET");
}

export async function getUserLoanApplications(): Promise<ApiResponse<loanApplicationData[]>> {
  return apiRequest<loanApplicationData[]>("/api/loan-applications/me","GET");
}

export async function createLoanApplication(data: createLoanApplicationData): Promise<ApiResponse<createLoanApplicationResponse>> {
  return apiRequest<createLoanApplicationResponse>("/api/loan-application","POST", data);
}

export async function evaluateLoanApplication(loanApplicationId: string): Promise<ApiResponse<evaluateLoanApplicationResponse>> {
  return apiRequest<evaluateLoanApplicationResponse>(`/api/loan-application/${loanApplicationId}/evaluate`, "PUT");
}

export async function getLoanProducts(): Promise<ApiResponse<getLoanProductData[]>> {
  return apiRequest<getLoanProductData[]>("/api/loan-products","GET");
}

export async function addLoanProduct(data: getLoanProductData): Promise<ApiResponse<getLoanProductData>> {
  return apiRequest<getLoanProductData>("/api/loan-products","POST", data);
}

export async function addCollateral(data: addCollateralData): Promise<ApiResponse<addCollteralResponse>> {
  return apiRequest<addCollteralResponse>("/api/collateral","POST", data);
}

export async function getCollateralforLoanApplication(loanApplicationId: string): Promise<ApiResponse<addCollteralResponse[]>> {
  return apiRequest<addCollteralResponse[]>(`/api/collateral/${loanApplicationId}`, "GET");
}

export async function getApprovedLoans(): Promise<ApiResponse<approvedLoansData[]>> {
  return apiRequest<approvedLoansData[]>("/api/approved-loans","GET");
}

export async function getAllPartners(): Promise<ApiResponse<getPartnerData[]>> {
  return apiRequest<getPartnerData[]>("/api/partner","GET");
}

export async function createPartner(data: { name: string}): Promise<ApiResponse<CreateFintechPartnerResponse>> {
  return apiRequest<CreateFintechPartnerResponse>("/api/partner/add-new","POST", data);
}