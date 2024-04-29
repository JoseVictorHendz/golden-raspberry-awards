# golden-raspberry-awards
Indice
=
  * ### [Observações](#Observações)
  * ### [Execução do projeto](#Execução-do-projeto)
  * ### [Requisitos](#Requisitos)

  Observações
=
* ### O banco utilizado foi o sqlite.
* ### O arquivo csv [fica na pasta resource](https://github.com/JoseVictorHendz/golden-raspberry-awards/tree/main/src/resources), é necessario q ele tenha o mesmo nome da env CSV_FILE_NAME
* ### O banco só será gerado caso não existe nenhum  banco em [src/database/database.sqlite](https://github.com/JoseVictorHendz/golden-raspberry-awards/tree/main/src/database)

Execução do projeto
=
* ### Rode ```npm i``` para instalar todas as dependências.
* ### Execute o seguinte comando ```npm start``` para [gerar o banco de dados](https://github.com/JoseVictorHendz/golden-raspberry-awards/tree/main/src/database), populado com o arquivo csv e sucessivamente executar o projeto.
* ### Rode ```npm test``` para instalar todas as dependências. (Ainda não está funcionando corretamente)

Requisitos
=
# Requisito do desafio
## Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido.
```
GET: http://localhost:3000/max-min-interval-winner
```
