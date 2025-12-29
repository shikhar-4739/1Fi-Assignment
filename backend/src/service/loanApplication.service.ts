import { prisma } from "../config/db";
import { ApiError } from "../utils/ApiError";

export const createLoanApplication = async (
  applicantId: string,
  productId: string,
  loanAmount: number,
  tenure: number
) => {
  const product = await prisma.loanProduct.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Loan product not found");
  }

  if (loanAmount < product.minAmount || loanAmount > product.maxAmount) {
    throw new Error("Loan amount out of allowed range");
  }

  const existing = await prisma.loanApplication.findFirst({
    where: {
      userId: applicantId,
      productId,
      status: "PENDING",
    },
  });

  if (existing) {
    throw new Error("Pending application already exists");
  }

  return prisma.loanApplication.create({
    data: {
      userId: applicantId,
      productId,
      loanAmount,
      tenure,
      status: "PENDING",
    },
  });
};

export const getUserLoanApplications = async (userId: string) => {
  return prisma.loanApplication.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getAllLoanApplications = async () => {
  return prisma.loanApplication.findMany({
    include: {
      product: true,
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const approveLoanApplication = async (applicationId: string) => {
  const application = await prisma.loanApplication.findUnique({
    where: { id: applicationId },
    include: { product: true },
  });
  
  if (!application) {
    throw new ApiError(404, "Loan application not found");
  }
  
  if (application.status !== "PENDING") {
    throw new ApiError(400, "Only pending applications can be approved");
  }

  // Use a transaction to update application and create loan
  return prisma.$transaction(async (tx) => {
 
    const updatedApplication = await tx.loanApplication.update({
      where: { id: applicationId },
      data: { status: "APPROVED" },
    });

    const loan = await tx.loan.create({
      data: {
        userId: application.userId,
        loanApplicationId: application.id,
        interestRate: application.product.interestRate,
        tenure: application.tenure,
        outstandingAmount: application.loanAmount,
      },
    });

    return { loan };
  });
};
