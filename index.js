// // string de conexão com o MongoDB
// // mongodb+srv://melipefoon:<password>@tti107-full.8p5wzvp.mongodb.net/?retryWrites=true&w=majority


const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());

const Filme = mongoose.model("Filme", mongoose.Schema({
    nome: { type: String },
    sinopse: { type: String }
    // imagemUrl: { type: String }
}));

async function conectarMongoDB() {
    await mongoose.connect(`mongodb+srv://melipefoon:123321@cluster0.8hpdfhx.mongodb.net/?retryWrites=true&w=majority`);
}


// let filmes = [
//     {

//         // id: 1,
//         nome: "Capitão America",
//         sinopse: "Capitão America é um super heroi da Marvel",
//         imagemUrl: "https://th.bing.com/th/id/R.b10bd495a4eaeb6c647cddb9b5de5696?rik=aI4P9LlvVuAVgw&riu=http%3a%2f%2fliseee.l.i.pic.centerblog.net%2fo%2f1b55c854.jpg&ehk=Pev5NBVqHlDh8l26EBpfNaXNn3vhOdXAQwQTk%2fEakmo%3d&risl=&pid=ImgRaw&r=0",
//     },
//     {
//         // id: 2,
//         nome: "Capitã Marvel",
//         sinopse: "Capitã Marvel é uma super heroina da Marvel",
//         imagemUrl: "https://br.web.img3.acsta.net/pictures/19/02/04/18/35/1468867.jpg",
//     },
//     {
//         // id: 3,
//         nome: "O Senhor dos Anéis",
//         sinopse: "O Senhor dos Anéis é um filme de fantasia",
//         imagemUrl: "https://br.web.img3.acsta.net/pictures/14/03/28/20/32/395879.jpg",
//     },
// ]

//GET https://localhost:3000/filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find();
    res.send(filmes)
});

//ponto de acesso para req get teste
app.get("/oi", (req, res) => res.send("oi"));

//GET https://localhost:3000/hey
app.get('/hey', (req, res) => {
    res.send('hey');
});

//GET https://localhost:3000/Corno
app.get('/Como vai', (req, res) => {
    res.send('Como vai');
});

//ponto de acesso para incluir um novo filme á lista de filmes
app.post('/filmes', async (req, res) => {
    // console.log(req.body.nome);
    const nome = req.body.nome;
    const sinopse = req.body.sinopse;

    const filme = new Filme({ nome: nome, sinopse: sinopse });

    await filme.save()
    const filmes = await Filme.find();
    res.json(filmes);
    // filmes.push(filme);
    // res.json(filmes)
    // res.send(filmes);
});

app.listen(3000, () => {
    try {
        conectarMongoDB();
        console.log('aplicação up and running');
    }
    catch (e) {
        console.log("ERROR: ", e);
    }

});
