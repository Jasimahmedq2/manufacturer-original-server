const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./Middleware/verifyJwt");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const userRouter = require("./Routers/user.route");
const paymentRouter = require("./Routers/payment.route");
const toolsRouter = require("./Routers/tools.route");
const purchaseRouter = require("./Routers/purchase.route");
const reviewRouter = require("./Routers/review.route");

app.use(cors());
app.use(express.json());

// router here
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/tools", toolsRouter);
app.use("/purchase", purchaseRouter);
app.use("/review", reviewRouter)

async function connectToDatabase() {
  try {
    // Connect to the database
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.o3j1i.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to the database!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

connectToDatabase();

app.get("/", (req, res) => {
  res.send("manufacturer website running");
});
app.listen(port, () => {
  console.log("server is running", port);
});
