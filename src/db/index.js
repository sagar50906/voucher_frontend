const { drizzle } = require('drizzle-orm/neon-http');
require("dotenv").config();
console.log("hey",process.env.DATABASE_URL)
const db = drizzle(process.env.DATABASE_URL);

module.exports = {
    db,
}