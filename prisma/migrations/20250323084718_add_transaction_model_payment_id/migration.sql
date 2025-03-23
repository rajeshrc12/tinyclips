-- DropIndex
DROP INDEX "Transaction_paymentId_key";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "paymentId" DROP NOT NULL;
