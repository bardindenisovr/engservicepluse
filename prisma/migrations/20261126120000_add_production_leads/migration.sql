ALTER TABLE "Lead"
ADD COLUMN "consentAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "direction" TEXT DEFAULT 'unsure',
ADD COLUMN "offerCode" TEXT,
ADD COLUMN "productionSize" TEXT,
ADD COLUMN "formId" TEXT,
ADD COLUMN "expertHint" TEXT,
ADD COLUMN "assignedTo" TEXT,
ADD COLUMN "submissionKey" TEXT;

CREATE UNIQUE INDEX "Lead_submissionKey_key" ON "Lead"("submissionKey");
CREATE INDEX "Lead_direction_idx" ON "Lead"("direction");
CREATE INDEX "Lead_assignedTo_idx" ON "Lead"("assignedTo");
CREATE INDEX "Lead_submissionKey_idx" ON "Lead"("submissionKey");

