# zcinema-api-gateway

## Depedências para inicializar o projeto
* Node.js

Neste caso, usaremos o [yarn ](https://yarnpkg.com/) como gerenciador de pacotes do Node.js. Estamos assumindo <br/> que o Postgres esteja ativo na porta 5432 da máquina local ou container (Docker).
### Passo a passo
* No diretório raiz do projeto execute:
```
yarn
```
* Em seguida execute:
```
yarn create-tmp
```
## Endpoints

### Usuários

* Cadatrar usuário:
    * Endpoint (POST): https://zcinema-api-gateway.herokuapp.com/api/users
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
    * Endpoint (GET): https://zcinema-api-gateway.com/api/users/ID_DO_USUARIO

* Editar usuário:
    * Endpoint (PATCH): https://zcinema-api-gateway.herokuapp.com/api/users/ID_DO_USUARIO
    * Body (campos que se deseja mudar): 
    ```
    {
	    "email": "caio@email.com"
    }
    ```
* Deletar usuário:
    * Endpoint (DELETE): https://zcinema-api-gateway.herokuapp.com/api/users/ID_DO_USUARIO

### Autenticação

* Autenticar:
    * Endpoint (POST): https://zcinema-api-gateway.herokuapp.com/api/auth
    * Authorization: 'Bearer VALOR_DO_TOKEN' 
    * Body: 
    ```
    {
       "email": "CAIO@email.com",
       "password": "123456"
    }
    ```
### Filmes

* Cadatrar de filme:
    * Endpoint (POST): https://zcinema-api-gateway.herokuapp.com/api/movies
    * Body (Todos abaixo são obrigatórios): 
    ```
	{
		"title": "Nome do filme",
		"description": "descrição",
		"trailer": "link",
		"start_date": "data de inicio de exibição (YYYY-MM-DD)",
		"end_date": "data de fim de exibição (YYYY-MM-DD)",
		"schedules": ["18:30","23:30"],
		"file": ARQUIVO DE IMAGEM.png/.jpeg/.jpg
 	}
    ```
* Ler filme:
    * Endpoint (GET): https://zcinema-api-gateway.com/api/movies/ID_DO_FILME

* Ler todos os filmes:
    * Endpoint (GET): https://zcinema-api-gateway.com/api/movies?title={TITULO_DO_FILME}&page=0&limit={QUANTIDADE_DE_FILMES}
    * Resposta:
    ```
	    {
	  "count": QUANTIDADE_DE_FILMES,
	  "previous": "ENDPOINT_PARA_FILMES_ANTERIORES",
	  "next": "ENDPOINT_PARA_PROXIMOS_FILMES",
	  "movies": [
	    {
	      "id": 1,
	      "title": "Inception",
	      "description": "descrição",
	      "trailer": "https://www.youtube.com/watch?v=8hP9D6kZseM",
	      "start_date": "2021-08-03",
	      "end_date": "2021-08-04",
	      "banner": "https://zcinema-api-gateway.herokuapp.com/uploads/movie-banners/1627786721407e58d0a44bbed89336e8cbabf83116090inception.jpeg",
	      "sessions": [
		"18:30",
		"23:30"
	      ],
	      "createdAt": "2021-08-01T02:58:41.729Z",
	      "updatedAt": "2021-08-01T02:58:41.729Z"
	    }
	  ]
	}
    ```

* Editar usuário:
    * Endpoint (PATCH): https://zcinema-api-gateway.herokuapp.com/api/movies/ID_DO_FILME
    * Body (campos que se deseja mudar): 
    ```
    {
	    "title": "FILME TESTE"
    }
    ```
* Deletar usuário:
    * Endpoint (DELETE): https://zcinema-api-gateway.herokuapp.com/api/movies/ID_DO_FILME
