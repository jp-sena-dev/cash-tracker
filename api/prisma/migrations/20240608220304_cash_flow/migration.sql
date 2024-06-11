-- CreateEnum
CREATE TYPE "CashFlowType" AS ENUM ('EXPENSE', 'INCOME');

-- CreateTable
CREATE TABLE "CashFlow" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "CashFlowType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashFlow_pkey" PRIMARY KEY ("id")
);
