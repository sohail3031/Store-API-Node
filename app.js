require("dotenv").config();
require("express-async-errors");

const express = require("express");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(
    "<h1>Store API</h1><br/><a href='/api/v1/products'>Products Route</a>"
  );
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URL);

    app.listen(port, console.log(`Server is listening on port ${3000}`));
  } catch (error) {
    console.error(error.message);
  }
};

start();
