const { integer, numeric, pgTable, text, uuid, varchar, timestamp } = require('drizzle-orm/pg-core');

const vendorsTable = pgTable("vendors", {
  id: uuid().defaultRandom().primaryKey(),
  createdDate: timestamp("createdDate").defaultNow(),
  date: text("date").notNull(),
  vendorName: text("vendor_name").notNull(),
  reason: text("reason").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("Pending"), 
  vendorSignature: text("vendor_signature"), // Base64 or URL
});

// Export the table
module.exports = { vendorsTable };
