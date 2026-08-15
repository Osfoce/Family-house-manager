/*
  Warnings:

  - The values [CHURCH_COORDINATOR] on the enum `MemberType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Made the column `medicalReportUrl` on table `MedicalInformation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileImageUrl` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdById` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('MEMBER', 'HOUSE_ADMIN', 'COORDINATOR');

-- CreateEnum
CREATE TYPE "HouseAdminPosition" AS ENUM ('PRESIDENT', 'SECRETARY_GENERAL', 'HOUSE_MAMA');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('VIEW_MEMBERS', 'REGISTER_MEMBER', 'EDIT_MEMBER', 'DELETE_MEMBER', 'MANAGE_PRAYERS', 'MANAGE_HOUSE', 'MANAGE_ADMINS', 'VIEW_MEDICAL_INFORMATION', 'EDIT_MEDICAL_INFORMATION', 'VIEW_PAYMENTS', 'RECORD_PAYMENT', 'MANAGE_PAYMENTS', 'VIEW_PAYMENT_HISTORY', 'MANAGE_ROSTER', 'VIEW_ROSTER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('DUES', 'WELFARE', 'CONTRIBUTION', 'EVENT', 'OTHER');

-- CreateEnum
CREATE TYPE "RosterStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "MemberType_new" AS ENUM ('CORPS_MEMBER', 'CHURCH_MEMBER');
ALTER TABLE "User" ALTER COLUMN "memberType" TYPE "MemberType_new" USING ("memberType"::text::"MemberType_new");
ALTER TYPE "MemberType" RENAME TO "MemberType_old";
ALTER TYPE "MemberType_new" RENAME TO "MemberType";
DROP TYPE "public"."MemberType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_createdById_fkey";

-- AlterTable
ALTER TABLE "MedicalInformation" ALTER COLUMN "medicalReportUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "houseId" TEXT,
ALTER COLUMN "profileImageUrl" SET NOT NULL,
ALTER COLUMN "createdById" SET NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseAdminAssignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "position" "HouseAdminPosition" NOT NULL,
    "title" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HouseAdminAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseCoordinator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HouseCoordinator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "type" "PaymentType" NOT NULL,
    "description" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "reference" TEXT NOT NULL,
    "providerReference" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RosterEntry" (
    "id" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "status" "RosterStatus" NOT NULL DEFAULT 'SCHEDULED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RosterEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_name_key" ON "House"("name");

-- CreateIndex
CREATE INDEX "HouseAdminAssignment_userId_idx" ON "HouseAdminAssignment"("userId");

-- CreateIndex
CREATE INDEX "HouseAdminAssignment_houseId_idx" ON "HouseAdminAssignment"("houseId");

-- CreateIndex
CREATE INDEX "HouseAdminAssignment_houseId_position_idx" ON "HouseAdminAssignment"("houseId", "position");

-- CreateIndex
CREATE INDEX "HouseCoordinator_houseId_idx" ON "HouseCoordinator"("houseId");

-- CreateIndex
CREATE INDEX "HouseCoordinator_userId_idx" ON "HouseCoordinator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HouseCoordinator_userId_houseId_key" ON "HouseCoordinator"("userId", "houseId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reference_key" ON "Payment"("reference");

-- CreateIndex
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");

-- CreateIndex
CREATE INDEX "Payment_houseId_idx" ON "Payment"("houseId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_paidAt_idx" ON "Payment"("paidAt");

-- CreateIndex
CREATE INDEX "Payment_userId_createdAt_idx" ON "Payment"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "RosterEntry_houseId_scheduledFor_idx" ON "RosterEntry"("houseId", "scheduledFor");

-- CreateIndex
CREATE INDEX "RosterEntry_userId_scheduledFor_idx" ON "RosterEntry"("userId", "scheduledFor");

-- CreateIndex
CREATE INDEX "RosterEntry_status_idx" ON "RosterEntry"("status");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseAdminAssignment" ADD CONSTRAINT "HouseAdminAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseAdminAssignment" ADD CONSTRAINT "HouseAdminAssignment_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseCoordinator" ADD CONSTRAINT "HouseCoordinator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseCoordinator" ADD CONSTRAINT "HouseCoordinator_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RosterEntry" ADD CONSTRAINT "RosterEntry_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RosterEntry" ADD CONSTRAINT "RosterEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
