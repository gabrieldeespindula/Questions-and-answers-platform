const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/",(req, res) => {
    var name = req.params.name
    res.render("index")
});

app.get("/ask",(req, res) => {
    res.render("ask");
})

app.listen(8080,()=>{console.log("App is running!")});