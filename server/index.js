const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const initRoute = require("./src/routes/initRoute");
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 8080;
const uri = process.env.ATLAS_URI;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
initRoute(app);

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port} `);
});

// Connect DB
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongDB connection established"))
    .catch((error) => console.log("MongDB connection fail: ", error.message));

// http://localhost:5000/
