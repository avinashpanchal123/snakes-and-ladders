const express = require("express");
const path = require("path")

const app = express();


const static = path.join(__dirname, "../public")

app.use(express.static(static))

app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render("index", {})
})


module.exports = app;
