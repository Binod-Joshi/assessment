const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb" })); // to get data from the frontend
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Mongodb connected");
}).catch(() => {
  console.log("Not connected to the Mongodb");
});

const authRoute = require("./routes/auth");

app.use("/auth", authRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
