// Local dev/static hosting entry point. Kept separate from server.ts so the
// Vercel serverless function (server.ts) never imports vite — bundling a dev
// tool like vite into a serverless function crashes it at module load.
import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import app from "./server";

const PORT = 3000;

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares as any);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath) as any);
    app.get("/apply", (req, res) => {
      res.sendFile(path.join(distPath, "apply.html"));
    });
    app.get("/apply.html", (req, res) => {
      res.sendFile(path.join(distPath, "apply.html"));
    });
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();