import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import { prisma } from "./config/prismaConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: "https://propertyxchange.vercel.app", // Frontend URL
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

// Test API Route
app.get("/api", async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(residencies); // Use res.json() for consistency
  } catch (error) {
    console.error("Error fetching residencies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Root Route (For Debugging)
app.get("/", (req, res) => {
  res.json({ message: "CORS is working" });
});

// Export Express App for Vercel
export default app;
