require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");

const student = require("./routes/student");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).send("Engine Started, Ready to take off!");
})

app.use("/student", student);

app.listen(port, () => {                                           //Inititating server
    console.log(`Here we go, Engines started at ${port}.`);
  })