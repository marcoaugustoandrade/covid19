const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
 
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1a-oNmhM-D1MOSY43jmFbUfGM_RMbw7n2mKccSXZOzd8');

(async function main() {
    
    await doc.useServiceAccountAuth(require('./credentials.json'));
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.loadCells('A1:H10');
    
    // Configuração de versão e data
    const config = {};
    config.id = 1;
    config.versao = sheet.getCellByA1('B9').value;;
    config.data = sheet.getCellByA1('B10').formattedValue;
    
    // Atualizando o quantitativo de casos
    const casos = {};
    casos.id = 1;
    casos.suspeitos = sheet.getCellByA1('B2').value; 
    casos.confirmados = sheet.getCellByA1('B3').value; 
    casos.descartados = sheet.getCellByA1('B4').value;
    casos.recuperados = sheet.getCellByA1('B5').value;
    casos.internados = sheet.getCellByA1('B6').value;
    casos.ativos = sheet.getCellByA1('B7').value;
    casos.novos = sheet.getCellByA1('B8').value;

    // Atualizando a quantidade de casos por faixa etária
    const faixa = {};
    faixa.id = 1;
    faixa._0a9 = sheet.getCellByA1('E2').value;
    faixa._10a19 = sheet.getCellByA1('E3').value;
    faixa._20a29 = sheet.getCellByA1('E4').value;
    faixa._20a39 = sheet.getCellByA1('E5').value;
    faixa._40a49 = sheet.getCellByA1('E6').value;
    faixa._50a59 = sheet.getCellByA1('E7').value;
    faixa._60mais = sheet.getCellByA1('E8').value;
    faixa._sigilo = sheet.getCellByA1('E9').value;

    // Atualizando a quantidade de dados por sexo
    const sexo = {};
    sexo.id = 1;
    sexo.feminino = sheet.getCellByA1('H2').value;
    sexo.masculino = sheet.getCellByA1('H3').value;
    sexo.sigilo = sheet.getCellByA1('H4').value;

    // Capturando as informações sobre leitos
    await sheet.loadCells('G13:H14');
    const leito = {};
    leito.id = 1;
    leito.uti = sheet.getCellByA1('G13').value;
    leito.uti_utilizado = sheet.getCellByA1('H13').value;
    leito.enfermaria = sheet.getCellByA1('G14').value;
    leito.enfermaria_utilizado = sheet.getCellByA1('H14').value;

    // Criando uma estrutura para armazenar os dados
    const j = {}
    j.config = [];
    j.config.push(config);
    j.casos = [];
    j.casos.push(casos);
    j.faixaetaria = [];
    j.faixaetaria.push(faixa);
    j.sexo = [];
    j.sexo.push(sexo);
    j.leitos = [];
    j.leitos.push(leito);
    j.dados = []
    j.bairros = []

    // Lendo o arquivo de bairros
    let rawdata = fs.readFileSync('/var/www/bairros.json');
    let bairro_dados = JSON.parse(rawdata);
    // bairro_dados.forEach(b => {
    //     if (b.nome == 'Cidade Verde I'){
    //         console.log('Cidade Verde I encontrado no arquivo bairros.json')
    //     }
    // })
    // console.log(bairro_dados[0].nome);


    // Capturando os casos ativos por bairro
    // TODO: célula para contar número de bairros
    const sheet3 = doc.sheetsByIndex[0];
    await sheet3.loadCells('A12:B38');
    for (var i = 12; i <= 38; i++){ //<<=== trocar aqui para quantidade de bairros
        const bairro = {}
        bairro.nome = sheet3.getCellByA1('A' + i.toString()).value;
        bairro.casos_ativos = sheet3.getCellByA1('B' + i.toString()).value;
        // bairro.coordenadas = sheet3.getCellByA1('C' + i.toString()).value;
        bairro_dados.forEach(b => {
            if (b.nome == bairro.nome){
                bairro.coordenadas = b.coordenadas
                console.log(bairro.nome)
            }
        })
        j.bairros.push(bairro);
        // console.log(bairro)
    }
    
    // console.log(j.bairros);

    // Capturando os dados
    const qtdDias = sheet.getCellByA1('B9').value + 3;
    // console.log(qtdDias)
    const sheet2 = doc.sheetsByIndex[1];
    const celulas = 'A3:I' + qtdDias.toString();
    await sheet2.loadCells(celulas);


    for (var i = 3; i <= qtdDias; i++){

        const dados = {};
        dados.dia = sheet2.getCellByA1('A' + i.toString()).value;
        dados.data = sheet2.getCellByA1('B' + i.toString()).formattedValue;
        dados.suspeitos = sheet2.getCellByA1('C' + i.toString()).value;
        dados.confirmados = sheet2.getCellByA1('D' + i.toString()).value;
        dados.descartados = sheet2.getCellByA1('E' + i.toString()).value;
        dados.recuperados = sheet2.getCellByA1('F' + i.toString()).value;
        dados.internados = sheet2.getCellByA1('G' + i.toString()).value;
        dados.ativos = sheet2.getCellByA1('H' + i.toString()).value;
        dados.novos = sheet2.getCellByA1('I' + i.toString()).value;
        j.dados.push(dados)
    }

    // Gravando no arquivo db.json
    fs.writeFileSync("/var/www/db.json", JSON.stringify(j));

})();
