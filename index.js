const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const QuestionsModel = require("./database/Questions");
const AnswerModel = require("./database/Answer");
const Answer = require("./database/Answer");

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
    QuestionsModel.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(questions =>{
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

app.post("/saveAnswer", (req, res) => {
    let response = req.body.response;
    let id_question = req.body.id_question;
    AnswerModel.create({
        response: response,
        id_question: id_question
    }).then(() => {
        res.redirect("/question/" + id_question);
    })
});

app.get("/question/:id", (req, res) => {
    let id = req.params.id;
    QuestionsModel.findOne({
        where: {id: id}
    }).then(question =>{
        if(question != undefined){
            res.render("question", {
                question: question
            });
        }else{
            res.redirect("/");
        }
    });
});

app.listen(8080,()=>{console.log("App is running!")});