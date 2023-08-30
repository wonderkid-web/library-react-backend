/*
  Warnings:

  - You are about to drop the column `userId` on the `Book` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Book_userId_idx` ON `Book`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Borrow` ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Borrow_userId_idx` ON `Borrow`(`userId`);
