/*
  Warnings:

  - Changed the type of `lat` on the `FavoriteList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lon` on the `FavoriteList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FavoriteList" DROP COLUMN "lat",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
DROP COLUMN "lon",
ADD COLUMN     "lon" DOUBLE PRECISION NOT NULL;
