<h2 align="center" style='font-family: sans-serif'>
	Client_API | API REST (Back-end)
</h2>

<p align = "center">
Este é o backend da aplicação Client_API para gerenciamento de clientes e contatos.
</p>

<h2 align ='center'>Clientes (Endpoints)</h2>

## <br/>

## **Rotas Sem Autenticação**

<li style='font-size: 20px'>Criação de um Cliente:</li>

<br/>

Observação: O campo "phone" precisa ter 11 digitos

`POST /clients - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
    "name": "matheus",
    "email": "matheus@gmail.com",
    "password": "matheus",
    "phone": 99934561234
}
```

Caso dê tudo certo, a resposta será assim:

`POST /clients - FORMATO DA RESPOSTA - STATUS 201`

```json
{
    "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
    "name": "matheus",
    "email": "matheus@gmail.com",
    "phone": "99934561234",
    "registered_date": "2023-03-22T18:03:24.787Z",
    "is_active": true,
    "contacts": []
}
```

<br/>

<li style='font-size: 20px'>Login do Cliente</li>

<br/>

`POST /clients/login - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
    "email": "matheus@gmail.com",
    "password": "matheus"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /clients/login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzk1MDgyMjIsImV4cCI6MTY3OTU5NDYyMiwic3ViIjoiODc3NTYzMzgtODE3Zi00OTZkLWI3ZTEtYzU2OGNmYzVlODJiIn0.HUSu-5Fdec2VvfnkFK5gINXap7DwnvJk1yXrQ4XyH28"
}
```

Caso dê um erro irá retornar o seguinte erro:

```json
{
    "message": "Client Not Found"
}
```

## **Rotas Com Autenticação**

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir informar as tecnologias que ele aprendeu até agora.

> Caso você tente acessar os endpoints sem um token válido receberá o seguinte erro

<br/>

`(Exemplo) POST /contacts/ - 401 Sem Autorização`

```json
{
    "message": "Invalid token"
}
```

<br/>

> Caso seja informado um id inválido ou diferente do id do usuário logado irá retornar:

```json
{
    "message": "Invalid Credentials Token"
}
```

## <br/>

<li style='font-size: 20px'>Podemos acessar um cliente específico utilizando o endpoint:</li>

<br/>

`GET /clients/:client_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
    "name": "matheus",
    "email": "matheus@gmail.com",
    "phone": "99934561234",
    "registered_date": "2023-03-22T18:03:24.787Z",
    "is_active": true,
    "contacts": []
}
```

<li style='font-size: 20px'>Atualização de um cliente</li>

<br/>

`PATCH /clients/:client_id - FORMATO DA REQUISIÇÃO`

```json
{
    "email": "matheusvincente@gmail.com"
}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /clients/:client_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
    "name": "matheus",
    "email": "matheusvincente@gmail.com",
    "phone": "99934561234",
    "registered_date": "2023-03-22T18:03:24.787Z",
    "is_active": true,
    "contacts": []
}
```

<li style='font-size: 20px'>Podemos deletar um cliente específico utilizando o endpoint:</li>

<br/>

`DELETE /clients/:client_id - FORMATO DA RESPOSTA - STATUS 204`

```json
{}
```

<br/>

<li style='font-size: 20px'>Outra Possível Mensagem de Erro:</li>

<br/>

```json
{
    "message": "Client Not Found"
}
```

<h2 align ='center'>Contatos (Endpoints)</h2>

## <br/>

<li style='font-size: 20px'>Criando um contato a partir do cliente logado:</li>

<br/>

`POST /contacts - FORMATO DA REQUISIÇÃO`

```json
{
    "name": "tio",
    "email": "tio@gmail.com",
    "password": "1234",
    "phone": 78123456789
}
```

Caso dê tudo certo, a resposta será assim:

`POST /contacts - FORMATO DA RESPOSTA - STATUS 201`

```json
{
    "id": "e020bc17-0d5d-4fff-b8dc-bc1b0482e9f3",
    "name": "lucas",
    "email": "lucas@gmail.com",
    "phone": 91123456788,
    "client": {
        "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
        "name": "neto",
        "email": "neto@gmail.com",
        "phone": "1234",
        "registered_date": "2023-03-22T18:03:24.787Z",
        "is_active": true
    },
    "registered_date": "2023-03-22T23:42:57.837Z",
    "is_active": true
}
```

<li style='font-size: 20px'>Acessando um contato</li>

<br/>

`GET /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    "id": "fc0eba19-dce2-41e5-8643-ff3a03d481e5",
    "name": "lucas",
    "email": "lucas@gmail.com",
    "phone": "91123456780",
    "registered_date": "2023-03-22T18:06:43.895Z",
    "is_active": true,
    "client": {
        "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
        "name": "neto",
        "email": "neto@gmail.com",
        "phone": "1234",
        "registered_date": "2023-03-22T18:03:24.787Z",
        "is_active": true
    }
}
```

<li style='font-size: 20px'>Atualização de um cliente</li>

<br/>

`PATCH /contacts/:contact_id - FORMATO DA REQUISIÇÃO`

```json
{
    "name": "gandalf",
    "email": "gandalf@gmail.com"
}
```

<li style='font-size: 20px'>Caso dê tudo certo, a resposta será assim:</li>

`PATCH /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    "id": "fc0eba19-dce2-41e5-8643-ff3a03d481e5",
    "name": "gandalf",
    "email": "gandalf@gmail.com",
    "phone": "91123456780",
    "registered_date": "2023-03-22T18:06:43.895Z",
    "is_active": true,
    "client": {
        "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
        "name": "neto",
        "email": "neto@gmail.com",
        "phone": "1234",
        "registered_date": "2023-03-22T18:03:24.787Z",
        "is_active": true
    }
}
```

<li style='font-size: 20px'>Podemos deletar um contato específico utilizando o endpoint:</li>

<br/>

`DELETE /contacts/:contact_id - FORMATO DA RESPOSTA - STATUS 204`

```json
{}
```

<br/>

<li style='font-size: 20px'>Outra Possível Mensagem de Erro:</li>

<br/>

```json
{
    "message": "Contact Not Found"
}
```

By Alfredo Neto
