const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/:name",(req, res) => {
    var name = req.params.name
    res.render("index")
});

app.listen(8080,()=>{console.log("App is running!")});