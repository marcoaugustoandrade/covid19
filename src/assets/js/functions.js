let confirmados = document.querySelector("#confirmados")
let recuperados = document.querySelector("#recuperados")
let suspeitos = document.querySelector("#suspeitos")
let ativos = document.querySelector("#ativos")
let descartados = document.querySelector("#descartados")
let internados = document.querySelector("#internados")

let url = 'https://apicovid19.adsvilhena.ninja'

// Totalizador
function run(){
    fetch(url + '/casos')
        .then(response => {
            response.json().then(dados => {
                recuperados.innerText = dados[0].recuperados
                confirmados.innerText = dados[0].confirmados
                suspeitos.innerText = dados[0].suspeitos
                ativos.innerText = dados[0].ativos
                descartados.innerText = dados[0].descartados
                internados.innerText = dados[0].internados
                // console.log(dados[0])
            })
        })

    }
// Gráfico faixa etária
var ctx_faixa_etaria = document.getElementById('grafico_faixa_etaria').getContext('2d');    
var data = []
var labels = [
    '0 a 9 anos',
    '10 a 19 anos',
    '20 a 29 anos',
    '30 a 39 anos',
    '40 a 49 anos',
    '50 a 59 anos',
    '60 ou mais',
    'Sigilo']
fetch(url + '/faixaetaria')
    .then(response => {
        response.json().then(dados => {

            data.push(dados[0]['_0a9'])
            data.push(dados[0]['_10a19'])
            data.push(dados[0]['_20a29'])
            data.push(dados[0]['_20a39'])
            data.push(dados[0]['_40a49'])
            data.push(dados[0]['_50a59'])
            data.push(dados[0]['_60mais'])
            data.push(dados[0]['_sigilo'])

            var myBarChart = new Chart(ctx_faixa_etaria, {
                type: 'horizontalBar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Distribuição por faixa etária',
                        data: data,
                        backgroundColor: '#284d93'
                    }]
                }
                // options: options
            })
        })
    })

// Gráfico sexo
var ctx_sexo = document.getElementById('grafico_sexo').getContext('2d');    
var data_sexo = []
var labels_sexo = [
    'Feminino',
    'Masculino',
    'Sigilo']
fetch(url + '/sexo')
    .then(response => {
        response.json().then(dados => {

            data_sexo.push(dados[0]['feminino'])
            data_sexo.push(dados[0]['masculino'])
            data_sexo.push(dados[0]['sigilo'])

            var myBarChart = new Chart(ctx_sexo, {
                type: 'bar',
                data: {
                    labels: labels_sexo,
                    datasets: [{
                        label: 'Distribuição por sexo',
                        data: data_sexo,
                        backgroundColor: '#284d93'
                    }]
                }
                // options: options
            })
        })
    })

// Gráficos de evolução
var ctx_evolucao_suspeitos = document.getElementById('grafico_evolucao_suspeitos').getContext('2d');
var ctx_evolucao_confirmados = document.getElementById('grafico_evolucao_confirmados').getContext('2d');
var ctx_evolucao_recuperados = document.getElementById('grafico_evolucao_recuperados').getContext('2d');
var ctx_confirmados_suspeitos = document.getElementById('grafico_confirmados_suspeitos').getContext('2d');


var data_suspeitos = [];
var data_confirmados = [];
var data_descartados = [];
var data_recuperados = [];
var data_internados = [];
var labels_evolucao = [];

fetch(url + '/dados')
    .then(response => {
        response.json().then(dados => {

            dados.forEach(d => {
                data_suspeitos.push(d.suspeitos);
                data_confirmados.push(d.confirmados);
                data_descartados.push(d.descartados);
                data_recuperados.push(d.recuperados);
                data_internados.push(d.internados);
                labels_evolucao.push(d.data)
            });

            var lineChartEvolucaoSuspeitos = new Chart(ctx_evolucao_suspeitos, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Evolução dos casos suspeitos',
                        data: data_suspeitos,
                        backgroundColor: '#e75d5f'
                    }]
                }
            //     // options: options
            })

            var lineChartEvolucaoConfirmados = new Chart(ctx_evolucao_confirmados, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Evolução dos casos confirmados',
                        data: data_confirmados,
                        backgroundColor: '#e44a65'
                    }]
                }
            //     // options: options
            })
            
            var lineChartEvolucaoRecuperados = new Chart(ctx_evolucao_recuperados, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Evolução dos casos recuperados',
                        data: data_recuperados,
                        backgroundColor: '#6bb964'
                    }]
                }
            //     // options: options
            })

            var teste = {
                labels: labels_evolucao,
                datasets: [{
                        backgroundColor: '#e44a65',
                        data: data_confirmados,
                        label: 'confirmados'
                    }, {
                        backgroundColor: '#ffa039',
                        data: data_suspeitos,
                        label: 'suspeitos'
                    }]
            }
            var lineChartConfirmadosSuspeitos = new Chart(ctx_confirmados_suspeitos, {
                type: 'line',
                data: teste
            });

        })
    })

  