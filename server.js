const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const token = require("./routes/api/token");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

//Db Config
const db = require("./config/keys").mongoURI;

// app.use("/api/token", token);
// const port = process.env.PORT || 5000;




app.use("/api/token", token);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));

