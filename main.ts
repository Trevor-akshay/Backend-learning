import express from "express";
import errorHandler from "./middleware/errorHandler.ts";
import logger from "./middleware/logger.ts";
import userRouter from "./routes/Users.routes.ts";
import { prisma } from "./data/prisma.ts";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use(logger);

app.use("/users", userRouter);

app.use("*all", (req, res) => {
  res.status(405).json({
    message: "Endpoint unavailable",
  });
});

app.use(errorHandler);
app.listen(PORT, async () => {
  console.log(`server listening on ${PORT}`);
  await prisma.$connect().then(() => {
    console.log(`Database connected successfully.`);
  });
});
