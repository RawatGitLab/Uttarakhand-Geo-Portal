import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables before doing anything else
const envPath = path.join(process.cwd(), ".env");
const envExamplePath = path.join(process.cwd(), ".env.example");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else if (fs.existsSync(envExamplePath)) {
  dotenv.config({ path: envExamplePath });
} else {
  dotenv.config();
}

async function startServer() {
  const app = express();

  // 1. Helmet headers configuration to secure the app without breaking static assets & maps (like Leaflet tiles)
  app.use(
    helmet({
      contentSecurityPolicy: false, // Leaflet maps load image tiles from openstreetmap.org and inline CSS
    })
  );

  // 2. Body parser with strict size limit (protects against large payload DOS)
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // 3. Cookie Parser
  app.use(cookieParser());

  // 4. Mount API Routes
  app.use("/api/auth", authRoutes);

  // 5. Serve Static Assets and SPA Fallback
  if (process.env.NODE_ENV !== "production") {
    // Dynamic import to avoid loading Vite in production
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const DIST_PATH = path.join(__dirname, "../../dist");

    // Serve compiled static assets
    app.use(express.static(DIST_PATH));

    // SPA Fallback for any client side route (that doesn't match API endpoints)
    app.get("*", (req, res, next) => {
      // If the path starts with /api/, don't fall back to index.html, return 404
      if (req.path.startsWith("/api/")) {
        return res.status(404).json({ error: "API endpoint not found" });
      }
      res.sendFile(path.join(DIST_PATH, "index.html"), (err) => {
        if (err) {
          next();
        }
      });
    });
  }

  // 6. Bind to Port (dynamic for Render)
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
