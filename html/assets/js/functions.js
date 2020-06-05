let confirmados=document.querySelector("#confirmados"),recuperados=document.querySelector("#recuperados"),suspeitos=document.querySelector("#suspeitos"),ativos=document.querySelector("#ativos"),descartados=document.querySelector("#descartados"),internados=document.querySelector("#internados"),novos=document.querySelector("#novos"),obitos=document.querySelector("#obitos"),atualizacao=document.querySelectorAll(".atualizacao"),uti_percentual=document.querySelector("#uti_percentual"),enfermaria_percentual=document.querySelector("#enfermaria_percentual"),url="https://apicovid19.adsvilhena.ninja";function run(){fetch(url+"/casos").then(a=>{a.json().then(a=>{recuperados.innerText=a[0].recuperados,confirmados.innerText=a[0].confirmados,suspeitos.innerText=a[0].suspeitos,ativos.innerText=a[0].ativos,descartados.innerText=a[0].descartados,internados.innerText=a[0].internados,novos.innerText=a[0].novos,obitos.innerText=a[0].obitos})}),fetch(url+"/config").then(a=>{a.json().then(a=>{atualizacao[0].innerText=a[0].data,atualizacao[1].innerText=a[0].data,atualizacao[2].innerText=a[0].data})})}var ctx_leitos=document.getElementById("grafico_leitos"),data_leitos=[],labels_leitos=["UTI utilizadas","Enfermarias utilizadas","Leitos disponíveis"];fetch(url+"/leitos").then(a=>{a.json().then(a=>{data_leitos.push(a[0].uti_utilizado),data_leitos.push(a[0].enfermaria_utilizado),data_leitos.push(a[0].uti+a[0].enfermaria-(a[0].uti_utilizado+a[0].enfermaria_utilizado));let o=`Leitos disponíveis: ${data_leitos[2]}; UTI utilizadas: ${data_leitos[0]}; Enfermarias utilizadas: ${data_leitos[1]}`;ctx_leitos.setAttribute("arial-label",o);new Chart(ctx_leitos.getContext("2d"),{type:"doughnut",data:{labels:labels_leitos,datasets:[{label:"Ocupação dos leitos",data:data_leitos,backgroundColor:["#ec5e50","#ffa039","#284d93"]}]}});leitos_percentual.innerText=parseFloat(100*(data_leitos[0]+data_leitos[1])/(data_leitos[0]+data_leitos[1]+data_leitos[2])).toFixed().toString()+" %"})});var ctx_faixa_etaria=document.getElementById("grafico_faixa_etaria"),data=[],labels=["0 a 9 anos","10 a 19 anos","20 a 29 anos","30 a 39 anos","40 a 49 anos","50 a 59 anos","60 ou mais","Sigilo"];fetch(url+"/faixaetaria").then(a=>{a.json().then(a=>{data.push(a[0]._0a9),data.push(a[0]._10a19),data.push(a[0]._20a29),data.push(a[0]._20a39),data.push(a[0]._40a49),data.push(a[0]._50a59),data.push(a[0]._60mais),data.push(a[0]._sigilo);let o=`Casos por faixa etária - De 0 a 9 anos: ${data[0]}; De 10 a 19 anos: ${data[1]}; De 20 a 29 anos: ${data[2]}; De 30 a 39 anos: ${data[3]}; De 40 a 49 anos: ${data[4]}; De 50 a 59 anos: ${data[5]}; Mais de 60 anos: ${data[6]}; Em sigilo: ${data[7]};`;ctx_faixa_etaria.setAttribute("arial-label",o);new Chart(ctx_faixa_etaria.getContext("2d"),{type:"horizontalBar",data:{labels:labels,datasets:[{label:"Distribuição por faixa etária (casos confirmados)",data:data,backgroundColor:"#284d93"}]}})})});var ctx_sexo=document.getElementById("grafico_sexo"),data_sexo=[],labels_sexo=["Feminino","Masculino","Sigilo"];fetch(url+"/sexo").then(a=>{a.json().then(a=>{data_sexo.push(a[0].feminino),data_sexo.push(a[0].masculino),data_sexo.push(a[0].sigilo);let o=`Casos por sexo - Feminino: ${data[0]}; Masculino: ${data[1]}; Em sigilo: ${data[2]}`;ctx_sexo.setAttribute("arial-label",o);new Chart(ctx_sexo.getContext("2d"),{type:"bar",data:{labels:labels_sexo,datasets:[{label:"Distribuição por sexo (casos confirmados)",data:data_sexo,backgroundColor:"#284d93"}]}})})});var ctx_casos_novos=document.getElementById("grafico_casos_novos").getContext("2d"),ctx_evolucao_recuperados=document.getElementById("grafico_evolucao_recuperados").getContext("2d"),ctx_evolucao_ativos=document.getElementById("grafico_evolucao_ativos").getContext("2d"),ctx_evolucao_confirmados=document.getElementById("grafico_evolucao_confirmados").getContext("2d"),ctx_evolucao_suspeitos=document.getElementById("grafico_evolucao_suspeitos").getContext("2d"),ctx_evolucao_descartados=document.getElementById("grafico_evolucao_descartados").getContext("2d"),ctx_evolucao_obitos=document.getElementById("grafico_evolucao_obitos").getContext("2d"),ctx_evolucao_internados=document.getElementById("grafico_evolucao_internados").getContext("2d"),ctx_grafico_confirmados_descartados=document.getElementById("grafico_confirmados_descartados").getContext("2d"),ctx_grafico_confirmados_recuperados=document.getElementById("grafico_confirmados_recuperados").getContext("2d"),ctx_grafico_confirmados_suspeitos=document.getElementById("grafico_confirmados_suspeitos").getContext("2d"),data_novos=[],data_recuperados=[],data_ativos=[],data_confirmados=[],data_suspeitos=[],data_descartados=[],data_internados=[],data_obitos=[],labels_evolucao=[];fetch(url+"/dados").then(a=>{a.json().then(a=>{a.forEach(a=>{data_novos.push(a.novos),data_recuperados.push(a.recuperados),data_ativos.push(a.ativos),data_confirmados.push(a.confirmados),data_suspeitos.push(a.suspeitos),data_descartados.push(a.descartados),data_internados.push(a.internados),data_obitos.push(a.obitos),labels_evolucao.push(a.data)});new Chart(ctx_casos_novos,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Casos novos por data",data:data_novos,backgroundColor:"#ffa039"}]}}),new Chart(ctx_evolucao_recuperados,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Evolução dos casos recuperados",data:data_recuperados,backgroundColor:"#6bb964"}]}}),new Chart(ctx_evolucao_ativos,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Evolução dos casos ativos",data:data_ativos,backgroundColor:"#ed5f51"}]}}),new Chart(ctx_evolucao_confirmados,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Evolução dos casos confirmados",data:data_confirmados,backgroundColor:"#ed5f51"}]}}),new Chart(ctx_evolucao_suspeitos,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Evolução dos casos suspeitos",data:data_suspeitos,backgroundColor:"#ed5f51"}]}}),new Chart(ctx_evolucao_descartados,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Evolução dos casos descartados",data:data_descartados,backgroundColor:"#284d93"}]}}),new Chart(ctx_evolucao_internados,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Casos internados por data",data:data_internados,backgroundColor:"#ffa039"}]}}),new Chart(ctx_evolucao_obitos,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Óbitos por data",data:data_obitos,backgroundColor:"#000"}]}}),new Chart(ctx_grafico_confirmados_descartados,{type:"line",data:{labels:labels_evolucao,datasets:[{backgroundColor:"#6bb964",data:data_confirmados,label:"confirmados"},{backgroundColor:"#ed5f51",data:data_descartados,label:"descartados"}]}}),new Chart(ctx_grafico_confirmados_recuperados,{type:"line",data:{labels:labels_evolucao,datasets:[{backgroundColor:"#284d93",data:data_recuperados,label:"recuperados"},{backgroundColor:"#6bb964",data:data_confirmados,label:"confirmados"}]}}),new Chart(ctx_grafico_confirmados_suspeitos,{type:"line",data:{labels:labels_evolucao,datasets:[{backgroundColor:"#6bb964",data:data_confirmados,label:"confirmados"},{backgroundColor:"#ed5f51",data:data_suspeitos,label:"suspeitos"}]}})})});var mymap=L.map("mapid").setView([-12.734791,-60.132294],13.4);L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyY29hdWd1c3RvYW5kcmFkZSIsImEiOiJja2Fzd2RncnYwM3JqMnFuNHc0MGd5Ym1mIn0.YWOW66o-Wn_l_E6RnPJUgQ",{maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox/streets-v11",tileSize:512,zoomOffset:-1}).addTo(mymap),fetch(url+"/bairros").then(a=>{a.json().then(a=>{a.forEach(a=>{let o=document.querySelector("#ativos-por-bairro");if(a.casos_ativos>0&&a.coordenadas){L.polygon(a.coordenadas).setStyle({fillColor:"#ec5e50",color:"#ec5e50"}).addTo(mymap).bindPopup(a.nome+": "+a.casos_ativos);let e=document.createElement("li");e.innerText=`Bairro: ${a.nome} tem ${a.casos_ativos} casos ativos`,o.appendChild(e)}})})});var popup=L.popup();function onMapClick(a){popup.setLatLng(a.latlng).setContent("You clicked the map at "+a.latlng.toString()).openOn(mymap)}mymap.on("click",onMapClick);