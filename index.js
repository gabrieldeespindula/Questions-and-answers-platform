const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req, res) => {
    var name = req.params.name
    res.render("index")
});

app.get("/ask",(req, res) => {
    res.render("ask");
})

app.post("/saveAsk",(req, res) =>{

});

app.listen(8080,()=>{console.log("App is running!")});