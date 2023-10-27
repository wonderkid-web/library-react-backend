-- CreateTable
CREATE TABLE "BorrowedBook" (
    "id" SERIAL NOT NULL,
    "idBook" TEXT NOT NULL,
    "borrow_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_at" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "borrower" TEXT NOT NULL,
    "imgURL" TEXT NOT NULL,

    CONSTRAINT "BorrowedBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "borrowId" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrow" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "borrow_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "done_at" TIMESTAMP(3) NOT NULL,
    "coverUrl" TEXT,
    "title" TEXT,
    "userId" INTEGER,
    "returnId" INTEGER,
    "notes" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Return" (
    "id" SERIAL NOT NULL,
    "return_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Return_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "bookId" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BorrowedBook_id_key" ON "BorrowedBook"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowedBook_idBook_key" ON "BorrowedBook"("idBook");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Book_borrowId_idx" ON "Book"("borrowId");

-- CreateIndex
CREATE INDEX "Borrow_userId_idx" ON "Borrow"("userId");

-- CreateIndex
CREATE INDEX "Borrow_returnId_idx" ON "Borrow"("returnId");
