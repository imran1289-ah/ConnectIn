import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const port = 9000;
dotenv.config();

//Supress DeprecationWarning message
mongoose.set("strictQuery", true);

//Database connection (MongoDB Atlas)
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      throw err;
    });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connect();
  console.log(`Server listening on port ${port}`);
});
