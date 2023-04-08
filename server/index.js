const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const uri = process.env.ATLAS_URI;

app.get("/", (req, res) => {
    res.send("Welcome our chat app APIS");
});

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port} `);
});

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongDB connection established"))
    .catch((error) => console.log("MongDB connection fail: ", error.message));

// http://localhost:5000/
