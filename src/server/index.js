import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const port = 9000;
dotenv.config();

//Supress DeprecationWarning message
mongoose.set("strictQuery", true);

//Database connection (MongoDB Atlas)
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE)
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

//Running the server
app.listen(port, () => {
  dbConnect();
  console.log(`Server listening on port ${port}`);
});
