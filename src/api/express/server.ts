import { Express } from "express";
import userRoutes from "./routes/userRoutes";

export function registerRoutes(app: Express): void {
  app.use("/api", userRoutes);
}
