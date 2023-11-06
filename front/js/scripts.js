const protocolo = "http://";
const host = "localhost";
const port = "3000";
const endPoint = "/filmes";

async function obterFilmes() {
    const urlComplete = `${protocolo}${host}:${port}${endPoint}`;
    const filmes = (await axios.get(urlComplete)).data;
    // console.log(filmes);
    let tabela = document.querySelector(".filmes");
    let corpoTabela = tabela.getElementsByTagName("tbody")[0];
    for (filme of filmes) {
        let linha = corpoTabela.insertRow(0);
        let celulaNome = linha.insertCell(0);
        let celulaSinopse = linha.insertCell(1);
        celulaNome.innerHTML = filme.nome;
        celulaSinopse.innerHTML = filme.sinopse;
    }
    // return filmes;
}
async function cadastrarFilme() {
    const urlComplete = `${protocolo}${host}:${port}${endPoint}`;
    let nome = document.querySelector("#nome").value;
    let sinopse = document.querySelector("#sinopse").value;
    let filme = { nome, sinopse };


    if (nome && sinopse) {

        nome = "";
        sinopse = "";
        const filmes = (await axios.post(urlComplete, filme)).data;
        // obterFilmes();
        let tabela = document.querySelector(".filmes");
        let corpoTabela = tabela.getElementsByTagName("tbody")[0];
        corpoTabela.innerHTML = "";
        for (let i of filmes) {
            console.log(i);
            let linha = corpoTabela.insertRow(0);
            let celulaNome = linha.insertCell(0);
            let celulaSinopse = linha.insertCell(1);
            celulaNome.innerHTML = i.nome;
            celulaSinopse.innerHTML = i.sinopse;
        }
    }
    else {
        let alert = document.querySelector(".alert");
        alert.classList.add("show");
        alert.classList.remove("d-none");
        setTimeout(() => {
            alert.classList.remove("show");
            alert.classList.add("d-none");
        }, 2000);
    }
}