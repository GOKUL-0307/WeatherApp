const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.get("/",(req,res) =>{
    res.send("Hello world")
});


app.listen(port,()=>{
    console.log("Server is listening"+port +"this way on the laptop 2244");
});
