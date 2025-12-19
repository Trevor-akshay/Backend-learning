-- DropIndex
DROP INDEX "Orders_user_id_key";

-- CreateIndex
CREATE INDEX "Orders_user_id_idx" ON "Orders"("user_id");
