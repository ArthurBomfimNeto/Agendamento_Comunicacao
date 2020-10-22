# Agendamento de Comunicação

Agendamento de comunicação é uma API com o intuito de realizar agendamentos de mensagens por  WhatsApp, E-mail, SMS e push criada com node. 

# Tecnologias Utilizadas.

- *NodeJs:* - Software open-source, cross-platform, e de um runtime de JavaScript que executa código de JavaScript.
- *Jest:* Estrutura de teste de JavaScript.
- *Express:* Framework web rápido, flexível e minimalista para Node.js.
- *Nodemon:* Monitora todas as alterações nos arquivos da aplicação e reinicia automaticamente o servidor quando for necessário.
- *mysql:* Gerenciamento de banco de dados (SGBD), que utiliza a linguagem SQL.
- *JWT:* realiza autenticação entre duas partes por meio de um token assinado que autentica uma requisição web.

---



# Instalação
## Pré-requisitos

É necessário instalar [MySql](https://dev.mysql.com/downloads/installer/) versão 8.0, [NodeJS](https://nodejs.org/pt-br/download/) e [Git](http://git-scm.com/downloads) os links apresentados para download são válidos em 21/10/2020

1. Clone o repositório:

   sh
   git clone https://github.com/ArthurBomfimNeto/Agendamento_Comunicacao.git

2. Instalação de dependências:

   sh
 npm install ou yarn install
   

# Execução:

1. Iniciar a API:
   sh
   npm start 

2. Modo desenvolvimento:
sh
npm run dev

3. Executar os testes:
   sh
   npm test 

# Configuração do projeto

1. Conectar no banco de dados com usuário e senha que serão configurados posteriormente no arquivo nodemon.json, 
executar os scripts do arquivo database.sql para criar a base de dados e as tabelas necessárias para o projeto. 

2. Criar um arquivo nodemon.json e copiar o conteúdo 
base do arquivo modelo nodemon.exemple.json alterando as variáveis de ambiente para conexão do banco de dados e na variavel "JWT_KEY" prencher com uma assinatura para criação do token.


# Rotas

Rota para cadastrar um usúario 
sh
POST http://localhost:3000/users/register

Rota para realizar o login de um usúario, que ira gerar o token.
sh
POST http://localhost:3000/users/login

Rota para visualizar todos os agendamentos.
sh
GET http://localhost:3000/schedule/

Rota para visualizar um agendamento 
sh
GET http://localhost:3000/schedule/:id_schedule

Rota para inserir um agendamento
sh
POST http://localhost:3000/schedule/

Rota para atualizar um agendamento
sh
PATCH http://localhost:3000/schedule/:id_schedule

Rota para remover um agendamento
sh
DELETE http://localhost:3000/schedule/:id_schedule

# Autenticação
1. Copiar o token gerado pelo login:

![token1](https://user-images.githubusercontent.com/54382866/96829329-d1b07700-140f-11eb-8f9b-20f9f2d7ec4e.png)
2. Authorization com Bearer Token:
![autentication](https://user-images.githubusercontent.com/54382866/96829305-bfced400-140f-11eb-8d87-fa78673f8929.png)

*Criado por*:

- [Arthur Bomfim](https://github.com/ArthurBomfimNeto)







