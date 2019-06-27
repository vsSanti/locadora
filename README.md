# Instalar as dependências
Pelo terminal, navegue até a pasta onde se encontra o projeto locadora, e rode o comando `npm install` para instalar todas as dependências do projeto.
# Banco de dados
No seu gerenciador de banco de dados, crie o schema locadora. Feito isso, no mesmo terminal, rode o comando `knex migrate:latest`. Caso queira inserir filmes no banco de dados, rode o comando `node inserts.js`. Esse comando criará automaticamente 10 filmes com um número entre 1 e 10 de exemplares.
# Iniciar o servidor
Rode o comando `npm run dev`.
# Postman
Todas as requisições necessárias foram testadas por mim utilizando o software Postman. Neste [link](https://drive.google.com/file/d/13fmhN-6FxFWVgxhHdozO-urnD8hJ3f_l/view?usp=sharing) você tem acesso ao arquivo de importação.

# Usuário
## Criar um Usuário
- Descrição: cria um novo usuário e automaticamente gera um token para fazer login
- Chamada: POST /usuario
- Autorização: não é necessária
- Entrada:
  - Obrigatório: nome, email e senha
- Saída:
  - Sucesso:
    - status 201
      - usuario: id, nome, email, senha (criptografada)
      - token: valor do token gerado
  - Rejeitado:
    - status 400
## Login
- Descrição: gera um novo token de acesso para o usuário
- Chamada: POST /usuario/login
- Autorização: não é necessária
- Entrada:
  - Obrigatório: email e senha (plain text)
- Saída:
  - Sucesso: 
    - status 200
      - usuario: id, nome, email, senha (criptografada)
      - token: valor do token gerado
  - Rejeitado:
    - status 400
      - status 401: autenticação falhou

## Logout
- Descrição: realiza o logout de um usuário, removendo o token atual
- Chamada: DEL /usuario/logout
- Autorização: Bearer Token com token do usuário logado
- Entrada: não é necessário
- Saída:
  - Sucesso:
    - status 200
  - Rejeitado:
    - status 401: autenticação falhou

# Filme
## Lista filmes disponíveis
- Descrição: retorna uma lista com todos os filmes com lista de exemplares disponíveis para locação
- Chamada: GET /filme/disponível
- Autorização: Bearer Token com token do usuário logado
- Entrada: não é necessário
- Saída:
  - Sucesso: 
    - status 200: array de filmes
  - Rejeitado:
    - status 401: autenticação falhou
    - status 500

## Lista filmes pelo título
- Descrição: retorna uma lista com todos os filmes em que o título contenha um valor igual ao do parâmetro passado. A função não é case sensitive, ou seja, AbC é igual a abc
- Chamada: GET /filme/porTitulo
- Autorização: Bearer Token com token do usuário logado
- Entrada:
  - Obrigatório: titulo
- Saída:
  - Sucesso:
    - status 200: array de filmes com seus exemplares que satisfazem a condição
  - Rejeitado:
    - status 401: autenticação falhou
    - status 500

# Locação
## Locar um filme
- Descrição: Loca um filme, baseado no id do exemplar passado por parâmetro
- Chamada: POST /locacao/locar
- Autorização: Bearer Token com token do usuário logado
- Entrada:
  - Obrigatório: exemplarFilme_id
- Saída:
  - Sucesso: 
    - status 200: array de filmes com seus exemplares que satisfazem a condição
- Rejeitado: 
    - status 400: exemplarFilme_id is null
    - status 401: autenticação falhou
    - status 404: exempar não foi encontrado ou já está locado
    - status 500: erro no servidor

## Devolver um filme
- Descrição: Devolve um filme, baseado no id da locação passado por parâmetro
- Chamada: POST /locacao/devolver
- Autorização: Bearer Token com token do usuário logado
- Entrada
  - Obrigatório: locacao_id
- Saída
  - Sucesso:
    - Status 200: retorna um array com dois elementos, sendo o primeiro a locacao com o exemplar, e o segundo elemento o exemplar
  - Rejeitado:
    - Status 500: erro no servidor

