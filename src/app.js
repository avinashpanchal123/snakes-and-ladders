const express = require("express");


const app = express();

const port = process.env.PORT  || 3500;

app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render("index", {})
})

app.listen(port, ()=>{
    console.log("listening on port 2233");
})