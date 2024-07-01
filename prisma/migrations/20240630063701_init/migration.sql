-- CreateTable
CREATE TABLE "FavoriteList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavoriteList_pkey" PRIMARY KEY ("id")
);
