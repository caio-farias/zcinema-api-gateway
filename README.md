# zcinema-api-gateway

## Depedências para inicializar o projeto
* Node.js

Neste caso, usaremos o [yarn ](https://yarnpkg.com/) como gerenciador de pacotes do Node.js. Estamos assumindo <br/> que o Postgres esteja ativo na porta 5432 da máquina local ou container (Docker).
### Passo a passo
* No diretório raiz do projeto execute:
`
yarn
`
* Em seguida execute:
`
yarn create-tmp
`
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

### Sessões
* Ler todas as sessões (GET):
	* Endpoint: https://zcinema-api-gateway.herokuapp.com/api/bookings/sessions/all
	
* Ler todas as sessões por data (GET):
	* Endpoint: https://zcinema-api-gateway.herokuapp.com/api/bookings/sessions?date=DATA&movie_title=TITULO_DO_FILME&schedule=HORARIO
	* Resposta:
```
	{
		"sessions": [
			{
				"id": 1,
				"movie_title": "Inception",
				"description": "A DEFINIR",
				"date": "2021-08-02",
				"schedule": "18:30",
				"price": 19.9,
				"session_watchers_id": [],
				"available_seats": [
					"A1",
					"A2",
					"A3",
					"A4",
					"A5",
					"A6",
					"B1",
					"B2",
					"B3",
					"B4",
					"B5",
					"B6",
					"C1",
					"C2",
					"C3",
					"C4",
					"C5",
					"C6"
				],
				"reserved_seats": [],
				"sold_seats": [],
				"createdAt": "2021-08-03T17:43:06.379Z",
				"updatedAt": "2021-08-03T17:43:06.379Z",
				"movie_id": 1
			},
		]
	}
```

### Reservas
* Cadastrar Reserva
	* Endpoint (POST):  https://zcinema-api-gateway.com/api/bookings/ID_DO_USUARIO/ID_DA_SESSAO
	* Body:
```
	{
		"seat": "A3",
		"session_date": "2021-08-03",
		"type": "Inteira"
	}
```
* Ler todas as reservas:
	* Endpoint (GET): https://zcinema-api-gateway.com/api/bookings?data=DATA_DA_SESSAO&page=0&limit=QUANTIDADE_DE_SESSOES
* Ler todas as reservas/sessões de um usuário: 
	* Endpoint (GET): https://zcinema-api-gateway.com/api/bookings/sessions/ID_DO_USUARIO
* Ler uma reserva de usuário:
	* Endpoint (GET): https://zcinema-api-gateway.com/api/bookings/ID_DO_USUARIO/ID_DA_SESSÂO

* Editar reserva de usuario:
	* Endpoint (PATCH):  https://zcinema-api-gateway.com/api/bookings/ID_DO_USUARIO/ID_DA_SESSÂO
	* Body:
```
	{
		status: "CANCELED"
	}
```
* Deletar reserva de usuario:
	* Endpoint (DELETE): https://zcinema-api-gateway.com/api/bookings/ID_DO_USUARIO/ID_DA_SESSÂO

### Vendas
* Cadastrar cartão de um usuário:
	* Endpoint (POST): https://zcinema-sales-microservice.herokuapp.com/api/sales/cards/ID_DO_USUARIO
	* Body:
```
{
  "number": "1235 1234 1234 1234",
  "secret": 123,
  "card_banner": "VISA"
}
```
* Ler cartões de um usuário:
	* Endpoint (GET): https://zcinema-sales-microservice.herokuapp.com/api/sales/cards/ID_DO_USUARIO
		
* Adicionar crédito:
	* Endpoint (POST): https://zcinema-sales-microservice.herokuapp.com/api/sales/credit/ID_DO_CARTAO
```
{
  "value": 25.50,
}
```
* Pagar uma reserva em andamento utilizando um cartão de usuário:
	* Endpoint (POST): https://zcinema-sales-microservice.herokuapp.com/api/sales/ID_DO_USUARIO/ID_DO_CARTAO/ID_DA_RESERVA

* Ler revervas pagas de um usuário:
	* Endpoint (GET): https://zcinema-sales-microservice.herokuapp.com/api/sales/ID_DO_USUARIO

