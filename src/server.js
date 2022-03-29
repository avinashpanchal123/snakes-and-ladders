const app = require('./index');

const port = process.env.PORT || 2233

app.listen(port, ()=>{
    console.log("listening on port 2233");
})