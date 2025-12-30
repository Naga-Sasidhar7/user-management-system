require("dotenv").config();           // Load .env first

const app = require("./src/app");      // Import Express app
const connectDB = require("./src/config/db"); // Import DB connection

const PORT = process.env.PORT || 5000;

// Debug: check app
console.log("app is:", app);          // Should print a function

// Connect to MongoDB first
connectDB().then(() => {
    // Start server after DB is connected
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});
