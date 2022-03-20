const express = require("express");


const app = express();

app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render("index", {})
})

app.listen(2233, ()=>{
    console.log("listening on port 2233");
})