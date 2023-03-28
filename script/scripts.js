import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById("graficoDolar")
const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
});


const graficoEuro = document.getElementById("graficoEuro")
const graficoParaEuro = new Chart(graficoEuro, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Euro',
        data: [],
        borderWidth: 1
      }]
    },
});

const graficoIene = document.getElementById("graficoIene");
const graficoParaIene = new Chart(graficoIene,{
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      data: [],
      borderWidth: 1
    }]
  }
})

function gerarHorario() {
  let data = new Date();
  let horario = data.getHours() + ":" + data.getMinutes() + ":" +  data.getSeconds();
  return horario
}

function adicionarDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) =>{
    dataset.data.push(dados);
  })

  grafico.update();
}

let workerDolar = new Worker("../script/workers/WorkerDolar.js")
workerDolar.postMessage("usd");

workerDolar.addEventListener("message", event => {
  let tempo = gerarHorario();
  let valor = event.data.ask;
  selecionaCotacao("dolar",valor)
  adicionarDados(graficoParaDolar,tempo,valor)
})


let workerEuro = new Worker("../script/workers/WorkerEuro.js")
workerEuro.postMessage("eur");

workerEuro.addEventListener("message", event => {
  let tempo = gerarHorario();
  let valor = event.data.ask;
  selecionaCotacao("euro",valor)
  adicionarDados(graficoParaEuro,tempo,valor)
})

let workerIene = new Worker("../script/workers/WorkerIene.js")
workerIene.postMessage("iene")
workerIene.addEventListener("message", event => {
  let tempo = gerarHorario();
  let valor = event.data.ask;

  selecionaCotacao("iene",valor);
  adicionarDados(graficoParaIene,tempo,valor);
})


//await / fetch / setInterval / assincronissidade / single thread && multithread/ paralelismo e concorrência