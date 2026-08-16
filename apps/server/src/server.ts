import app from "./app.js";
import { env } from "./config/env.js";
import { Server } from "http";
import { AppError } from "./common/errors/AppError.js";
import { connectDB, disconnectDB } from "./config/db.js";

let server: Server | null = null;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(env.PORT, () => {
      console.log(`Server started on port ${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
    });
  } catch (err) {
    const error = new AppError("Failed to start server", 500, err);
    console.error(error.message, error.details);
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  console.log(`\n ${signal} recieved. Shutting down gracefully...`);
  if (server) {
    // Force close after 10 seconds
    const timeout = setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down",
      );
      process.exit(1);
    }, 10000);

    server.close(async () => {
      clearTimeout(timeout);
      await disconnectDB();
      console.log("Server closed");
      process.exit(0);
    });
  } else {
    await disconnectDB();
    process.exit(0);
  }
};

startServer();

// Handle unhandled promie rejections (eg. database connection error)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  shutdown("UNHANDLED_REJECTION");
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  shutdown("UNCAUGHT_EXCEPTION");
});

// Graceful shutdown
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
