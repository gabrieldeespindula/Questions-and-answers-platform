const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const QuestionsModel = require("./database/Questions");

connection
    .authenticate()
    .then(() => {
        console.log("Connected!")
    })
    .catch((msgError) => {
        console.log(msgError);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req, res) => {
    QuestionsModel.findAll({raw: true}).then(questions =>{
        res.render("index", {
            questions: questions
        });
    });
});

app.get("/ask",(req, res) => {
    res.render("ask");
})

app.post("/saveAsk",(req, res) =>{
    let title =  req.body.title;
    let description = req.body.description;
    QuestionsModel.create({
        title: title,
        description: description
    }).then(() =>{
        res.redirect("/");
    })
});

app.listen(8080,()=>{console.log("App is running!")});