let confirmados = document.querySelector("#confirmados")
let recuperados = document.querySelector("#recuperados")
let suspeitos = document.querySelector("#suspeitos")
let ativos = document.querySelector("#ativos")
let descartados = document.querySelector("#descartados")
let internados = document.querySelector("#internados")
let novos = document.querySelector("#novos")
let atualizacao = document.querySelector('#atualizacao')

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
                novos.innerText = dados[0].novos
                // console.log(dados[0])
            })
        })
    fetch(url + '/config')
        .then(response => {
            response.json().then(dados => {
                atualizacao.innerText = dados[0].data
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
                        label: 'Distribuição por faixa etária (casos confirmados)',
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
                        label: 'Distribuição por sexo (casos confirmados)',
                        data: data_sexo,
                        backgroundColor: '#284d93'
                    }]
                }
                // options: options
            })
        })
    })

// Gráficos de evolução
var ctx_casos_novos = document.getElementById('grafico_casos_novos').getContext('2d');
var ctx_evolucao_recuperados = document.getElementById('grafico_evolucao_recuperados').getContext('2d');
var ctx_evolucao_ativos = document.getElementById('grafico_evolucao_ativos').getContext('2d');
var ctx_evolucao_confirmados = document.getElementById('grafico_evolucao_confirmados').getContext('2d');
var ctx_evolucao_suspeitos = document.getElementById('grafico_evolucao_suspeitos').getContext('2d');
var ctx_evolucao_descartados = document.getElementById('grafico_evolucao_descartados').getContext('2d');
var ctx_evolucao_internados = document.getElementById('grafico_evolucao_internados').getContext('2d');
var ctx_grafico_confirmados_descartados = document.getElementById('grafico_confirmados_descartados').getContext('2d');
var ctx_grafico_confirmados_recuperados = document.getElementById('grafico_confirmados_recuperados').getContext('2d');
var ctx_grafico_confirmados_suspeitos = document.getElementById('grafico_confirmados_suspeitos').getContext('2d');

var data_novos = [];
var data_recuperados = [];
var data_ativos = [];
var data_confirmados = [];
var data_suspeitos = [];
var data_descartados = [];
var data_internados = [];
var labels_evolucao = [];

fetch(url + '/dados')
    .then(response => {
        response.json().then(dados => {

            dados.forEach(d => {
                data_novos.push(d.novos);
                data_recuperados.push(d.recuperados);
                data_ativos.push(d.ativos);
                data_confirmados.push(d.confirmados);
                data_suspeitos.push(d.suspeitos);
                data_descartados.push(d.descartados);
                data_internados.push(d.internados);
                labels_evolucao.push(d.data)
            });

            // Casos novos
            var lineChartCasosNovos = new Chart(ctx_casos_novos, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Casos novos por data',
                        data: data_novos,
                        backgroundColor: '#6bb964'
                    }]
                }
            //     // options: options
            })

            // Evolução recuperados
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

            // Evolução ativos
            var lineChartEvolucaoAtivos = new Chart(ctx_evolucao_ativos, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Evolução dos casos ativos',
                        data: data_ativos,
                        backgroundColor: '#e44a65'
                    }]
                }
            //     // options: options
            })

            // Evolução confirmados
            var lineChartEvolucaoConfirmados = new Chart(ctx_evolucao_confirmados, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Evolução dos casos confirmados',
                        data: data_confirmados,
                        backgroundColor: '#e75d5f'
                    }]
                }
            //     // options: options
            })
            
            // Evolução suspeitos
            var lineChartEvolucaoSuspeitos = new Chart(ctx_evolucao_suspeitos, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Evolução dos casos suspeitos',
                        data: data_suspeitos,
                        backgroundColor: '#e44a65'
                    }]
                }
            //     // options: options
            })

            // Evolução descartados
            var lineChartEvolucaoDescartados = new Chart(ctx_evolucao_descartados, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Evolução dos casos descartados',
                        data: data_descartados,
                        backgroundColor: '#e44a65'
                    }]
                }
            //     // options: options
            })

            // Evolução internados
            var lineChartEvolucaoInternados = new Chart(ctx_evolucao_internados, {
                type: 'line',
                data: {
                    labels: labels_evolucao,
                    datasets: [{
                        label: 'Casos internados por data',
                        data: data_internados,
                        backgroundColor: '#ffa039'
                    }]
                }
            //     // options: options
            })
            
            // Confirmados X descartados
            var confirmados_descartados = {
                labels: labels_evolucao,
                datasets: [{
                        backgroundColor: '#6bb964',
                        data: data_confirmados,
                        label: 'confirmados'
                    }, {
                        backgroundColor: '#e44a65',
                        data: data_descartados,
                        label: 'descartados'
                    }]
            }
            var lineChartConfirmadosDescartados = new Chart(ctx_grafico_confirmados_descartados, {
                type: 'line',
                data: confirmados_descartados
            });

            // Confirmados X recuperados
            var confirmados_recuperados = {
                labels: labels_evolucao,
                datasets: [{
                        backgroundColor: '#284d93',
                        data: data_recuperados,
                        label: 'recuperados'
                    },{
                        backgroundColor: '#6bb964',
                        data: data_confirmados,
                        label: 'confirmados'
                    }]
            }
            var lineChartConfirmadosRecuperados = new Chart(ctx_grafico_confirmados_recuperados, {
                type: 'line',
                data: confirmados_recuperados
            });

            // Confirmados X suspeitos
            var confirmados_suspeitos = {
                labels: labels_evolucao,
                datasets: [{
                        backgroundColor: '#6bb964',
                        data: data_confirmados,
                        label: 'confirmados'
                    }, {
                        backgroundColor: '#284d93',
                        data: data_suspeitos,
                        label: 'suspeitos'
                    }]
            }
            var lineChartConfirmadosSuspeitos = new Chart(ctx_grafico_confirmados_suspeitos, {
                type: 'line',
                data: confirmados_suspeitos
            });
        })
    })

// Mapas
var mymap = L.map('mapid').setView([-12.734791, -60.132294], 13.4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyY29hdWd1c3RvYW5kcmFkZSIsImEiOiJja2Fzd2RncnYwM3JqMnFuNHc0MGd5Ym1mIn0.YWOW66o-Wn_l_E6RnPJUgQ', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

// L.marker([51.5, -0.09]).addTo(mymap)
//     .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

// L.circle([-12.734791, -60.132294], 500, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5
// }).addTo(mymap).bindPopup('Casos confirmados: ');


fetch(url + '/bairros')
    .then(response => {
        response.json().then(dados => {
            dados.forEach(d => {
                // console.log(typeof(d.coordenadas))
                var coordenadas = d.coordenadas.split(',')
                var tamanho = d.casos_ativos * 100
                // console.log(coordenadas[0]);
                // L.circle([-12.734791, -60.132294], 500, {
                // Plotando somente os casos ativos
                if (d.casos_ativos > 0){
                    L.circle([coordenadas[0], coordenadas[1]], tamanho, {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5
                    }).addTo(mymap).bindPopup(d.nome + ": " + d.casos_ativos);
                    // }).addTo(mymap).bindPopup(d.nome + ": " + d.casos_ativos).bindTooltip(d.casos_ativos.toString()).openTooltip();

                }
            })
        })
    })

// L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(mymap).bindPopup("I am a polygon.");

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

