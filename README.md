# zcinema-api-gateway

## Depedências para inicializar o projeto
* Node.js

Neste caso, usaremos o [yarn ](https://yarnpkg.com/) como gerenciador de pacotes do Node.js. Estamos assumindo <br/> que o Postgres esteja ativo na porta 5432 da máquina local ou container (Docker).
### Passo a passo
* No diretório raiz do projeto execute:
```
yarn
```

## Endpoints

### Usuários

* Cadatrar usuário:
    * Endpoint (POST): https://zcinema-api-gateway.herokuapp.com/users
    * Body (Todos abaixo são obrigatórios): 
    ```
    {
        "first_name": "Caio",
        "last_name": "FARIAS",
        "password": "123456",
        "profile": "Cliente",
        "email": "CAIO@email.com",
        "file": ARQUIVO DE IMAGEM.png/.jpeg/.jpg
    }
    ```
* Ler usuário:
    * Endpoint (GET): https://zcinema-api-gateway.com/users/ID_DO_USUARIO

* Editar usuário:
    * Endpoint (PATCH): https://zcinema-api-gateway.herokuapp.com/users/ID_DO_USUARIO
    * Body (campos que se deseja mudar): 
    ```
    {
	    "email": "caio@email.com"
    }
    ```
* Deletar usuário:
    * Endpoint (DELETE): https://zcinema-api-gateway.herokuapp.com/users/ID_DO_USUARIO

### Autenticação

* Autenticar:
    * Endpoint (POST): https://zcinema-api-gateway.herokuapp.com/auth
    * Authorization: 'Bearer VALOR_DO_TOKEN' 
    * Body: 
    ```
    {
       "email": "CAIO@email.com",
       "password": "123456"
    }
    ```
