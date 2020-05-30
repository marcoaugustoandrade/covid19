let confirmados=document.querySelector("#confirmados"),recuperados=document.querySelector("#recuperados"),suspeitos=document.querySelector("#suspeitos"),ativos=document.querySelector("#ativos"),descartados=document.querySelector("#descartados"),internados=document.querySelector("#internados"),url="https://apicovid19.adsvilhena.ninja";function run(){fetch(url+"/casos").then(a=>{a.json().then(a=>{recuperados.innerText=a[0].recuperados,confirmados.innerText=a[0].confirmados,suspeitos.innerText=a[0].suspeitos,ativos.innerText=a[0].ativos,descartados.innerText=a[0].descartados,internados.innerText=a[0].internados})})}var ctx_faixa_etaria=document.getElementById("grafico_faixa_etaria").getContext("2d"),data=[],labels=["0 a 9 anos","10 a 19 anos","20 a 29 anos","30 a 39 anos","40 a 49 anos","50 a 59 anos","60 ou mais","Sigilo"];fetch(url+"/faixaetaria").then(a=>{a.json().then(a=>{data.push(a[0]._0a9),data.push(a[0]._10a19),data.push(a[0]._20a29),data.push(a[0]._20a39),data.push(a[0]._40a49),data.push(a[0]._50a59),data.push(a[0]._60mais),data.push(a[0]._sigilo);new Chart(ctx_faixa_etaria,{type:"horizontalBar",data:{labels:labels,datasets:[{label:"Distribuição por faixa etária",data:data,backgroundColor:"#284d93"}]}})})});var ctx_sexo=document.getElementById("grafico_sexo").getContext("2d"),data_sexo=[],labels_sexo=["Feminino","Masculino","Sigilo"];fetch(url+"/sexo").then(a=>{a.json().then(a=>{data_sexo.push(a[0].feminino),data_sexo.push(a[0].masculino),data_sexo.push(a[0].sigilo);new Chart(ctx_sexo,{type:"bar",data:{labels:labels_sexo,datasets:[{label:"Distribuição por sexo",data:data_sexo,backgroundColor:"#284d93"}]}})})});var ctx_evolucao_suspeitos=document.getElementById("grafico_evolucao_suspeitos").getContext("2d"),ctx_evolucao_confirmados=document.getElementById("grafico_evolucao_confirmados").getContext("2d"),ctx_evolucao_recuperados=document.getElementById("grafico_evolucao_recuperados").getContext("2d"),ctx_confirmados_suspeitos=document.getElementById("grafico_confirmados_suspeitos").getContext("2d"),data_suspeitos=[],data_confirmados=[],data_descartados=[],data_recuperados=[],data_internados=[],labels_evolucao=[];fetch(url+"/dados").then(a=>{a.json().then(a=>{a.forEach(a=>{data_suspeitos.push(a.suspeitos),data_confirmados.push(a.confirmados),data_descartados.push(a.descartados),data_recuperados.push(a.recuperados),data_internados.push(a.internados),labels_evolucao.push(a.data)});new Chart(ctx_evolucao_suspeitos,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Evolução dos casos suspeitos",data:data_suspeitos,backgroundColor:"#e75d5f"}]}}),new Chart(ctx_evolucao_confirmados,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Evolução dos casos confirmados",data:data_confirmados,backgroundColor:"#e44a65"}]}}),new Chart(ctx_evolucao_recuperados,{type:"line",data:{labels:labels_evolucao,datasets:[{label:"Evolução dos casos recuperados",data:data_recuperados,backgroundColor:"#6bb964"}]}}),new Chart(ctx_confirmados_suspeitos,{type:"line",data:{labels:labels_evolucao,datasets:[{backgroundColor:"#e44a65",data:data_confirmados,label:"confirmados"},{backgroundColor:"#ffa039",data:data_suspeitos,label:"suspeitos"}]}})})});var mymap=L.map("mapid").setView([-12.734791,-60.132294],13);L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyY29hdWd1c3RvYW5kcmFkZSIsImEiOiJja2Fzd2RncnYwM3JqMnFuNHc0MGd5Ym1mIn0.YWOW66o-Wn_l_E6RnPJUgQ",{maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox/streets-v11",tileSize:512,zoomOffset:-1}).addTo(mymap),fetch(url+"/bairros").then(a=>{a.json().then(a=>{a.forEach(a=>{var o=a.coordenadas.split(","),e=200*a.casos_ativos;a.casos_ativos>0&&L.circle([o[0],o[1]],e,{color:"red",fillColor:"#f03",fillOpacity:.5}).addTo(mymap).bindPopup(a.nome+": "+a.casos_ativos)})})});var popup=L.popup();function onMapClick(a){popup.setLatLng(a.latlng).setContent("You clicked the map at "+a.latlng.toString()).openOn(mymap)}mymap.on("click",onMapClick);