-- Изменения по разделу «Инструменты», п. 5.1: поля формы «Обсудить задачу»
ALTER TABLE "Lead" ADD COLUMN "helpFormat" TEXT;
ALTER TABLE "Lead" ADD COLUMN "sourcePage" TEXT;
ALTER TABLE "Lead" ADD COLUMN "sourceTool" TEXT;
ALTER TABLE "Lead" ADD COLUMN "utmSource" TEXT;
ALTER TABLE "Lead" ADD COLUMN "utmMedium" TEXT;
ALTER TABLE "Lead" ADD COLUMN "utmCampaign" TEXT;
ALTER TABLE "Lead" ADD COLUMN "consentVersion" TEXT;
ALTER TABLE "Lead" ADD COLUMN "newsletterConsent" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Lead" ADD COLUMN "analysisAttached" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Lead" ADD COLUMN "analysisLink" TEXT;
