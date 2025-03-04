CREATE TABLE "vendors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdDate" timestamp DEFAULT now(),
	"date" text NOT NULL,
	"vendor_name" text NOT NULL,
	"reason" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"status" text DEFAULT 'Pending',
	"vendor_signature" text
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;