import "reflect-metadata";
require("pg");
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import rateLimiter from "express-rate-limit";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";

//Error imports
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

// Routes
import userRoutes from "./routes/user";
import buddyRoutes from "./routes/buddy";

//Models
import UserModel from "./models/user";
import BuddyModel from "./models/buddy";

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(logger("dev"));
app.use(helmet());

//Extra packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.send("Api working perfectly");
});

//Authentication Route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/buddy", buddyRoutes);

//Errors
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await UserModel.sequelize
      ?.sync()
      .then(() => {
        console.log("Drop and sync db.");
      })
      .catch((err) => console.log(err));

    await BuddyModel.sequelize
      ?.sync()
      .then(() => {
        console.log("Drop and sync db.");
      })
      .catch((err) => console.log(err));
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
