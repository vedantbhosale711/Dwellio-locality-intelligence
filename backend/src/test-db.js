const { checkDatabaseHealth } = require("./config/db");

async function testConnection() {
    try {
        await checkDatabaseHealth();
        console.log("Neon connection check succeeded.");
    } catch (error) {
        console.error("Connection failed:", error.message);
    }
}

testConnection();
