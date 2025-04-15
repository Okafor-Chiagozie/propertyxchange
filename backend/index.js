import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();  

const app = express();
const PORT = process.env.PORT || 3000;
const frontend_url = process.env.FRONTEND_URL || "https://propertyxchange.vercel.app";

// CORS Configuration
const corsOptions = {
  origin: frontend_url, // Frontend URL
  credentials: true, // Allows sending cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handles preflight requests

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Export Express App for Vercel
// export default app;
