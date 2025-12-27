import { prisma } from "../config/db";

export const createLoanApplication = async (
  applicantId: string,
  productId: string,
  loanAmount: number
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
