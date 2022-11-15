const express = require("express");

const api = express();

const porta = 40000;

api.listen(porta, () => {
    console.log("Api avviata e in ascolto sulla porta " + porta);
});

api.get("/", (req, res) =>{
    res.send("<h1>LMAO</h1>");
});