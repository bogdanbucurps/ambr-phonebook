-- CreateTable
CREATE TABLE "phonebook" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(63) NOT NULL,
    "last_name" VARCHAR(63) NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "phonebook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "phonebook_id_key" ON "phonebook"("id");

-- CreateIndex
CREATE UNIQUE INDEX "phonebook_phone_number_key" ON "phonebook"("phone_number");

-- CreateIndex
CREATE INDEX "phonebook_last_name_idx" ON "phonebook"("last_name");

-- CreateIndex
CREATE UNIQUE INDEX "phonebook_first_name_last_name_key" ON "phonebook"("first_name", "last_name");
