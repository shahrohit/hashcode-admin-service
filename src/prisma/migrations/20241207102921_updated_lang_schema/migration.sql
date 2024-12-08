/*
  Warnings:

  - You are about to drop the column `compileCmd` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `executeCmd` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `extension` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Language` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lang]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lang` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language" DROP COLUMN "compileCmd",
DROP COLUMN "executeCmd",
DROP COLUMN "extension",
DROP COLUMN "isActive",
DROP COLUMN "options",
DROP COLUMN "version",
ADD COLUMN     "lang" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Language_lang_key" ON "Language"("lang");
