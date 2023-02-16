const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require("cors");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(session({ secret: "secret123" }));
const port = 9000;
dotenv.config();

//Cors middleware to accept request from client
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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
app.use("/users", require("./routes/userRoutes.js"));
app.use("/resume", require("./routes/uploadResumeCL.js"));

app.get("/search", async (req, res) => {
  const firstname = req.query.term;

  const users = await User.find({
    firstname: { $regex: firstname, $options: "i" },
  }).then((users) => {
    if (users) {
      res.status(200).json(users);
    } else {
      return res.status(400).json({ message: "No user exists with this name" });
    }
  });
});

//Running the server
const server = app.listen(port, () => {
  dbConnect();
  // console.log(`Server listening on port ${port}`);
});

module.exports = server;
