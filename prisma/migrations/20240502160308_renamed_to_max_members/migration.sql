/*
  Warnings:

  - You are about to drop the column `maxUsers` on the `Room` table. All the data in the column will be lost.
  - Added the required column `maxMembers` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "maxUsers",
ADD COLUMN     "maxMembers" INTEGER NOT NULL;
