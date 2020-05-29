# API para acompanhamento da Covid19 em Vilhena - RO

Instalar os pacotes:
npm install

Configuração do `package.json` local:
"start": "/path-to/grafana-covid19/node_modules/.bin/json-server --watch /path-to/db.json --read-only --host localhost"

Configuração do `package.json` no servidor:
"start": "/path-to/grafana-covid19/node_modules/.bin/json-server --watch /path-to/db.json --read-only --host 10.84.5.244"

Rodar local:
npm run start

Adicionar no pm2:
pm2 start npm -- start
pm2 list

Rodar o `html` no Nginx, na pasta `/var/www/html`.

Para capturar dados da planilha:
node get-data.js

Colocar a captura no crontab:
* * * * * /var/www/atualizar.sh

O `credentials.json` deve ser baixado do Google.


