-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "statusId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "paymentPixId" INTEGER NOT NULL,
    "paymentCreditCardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pix_payments" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "datePayment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pix_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_card_payments" (
    "id" SERIAL NOT NULL,
    "amountPayments" INTEGER NOT NULL,

    CONSTRAINT "credit_card_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_paymentPixId_fkey" FOREIGN KEY ("paymentPixId") REFERENCES "pix_payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_paymentCreditCardId_fkey" FOREIGN KEY ("paymentCreditCardId") REFERENCES "credit_card_payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
