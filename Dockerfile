FROM ubuntu:20.04
WORKDIR /app
COPY ./html /var/www
COPY . .
RUN apt-get update && apt-get install nodejs && \
    apt-get install nginx
RUN npm install
RUN sh atualizar.sh
ENTRYPOINT [ "npm", "start" ]