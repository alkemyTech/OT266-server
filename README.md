# Server Base - Proyecto ONG

## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```
### Miembros

_Todas las peticiones se harán en formato JSON_

_Para visualizar los miembros por página, es obligatorio proporcionar la página a visualizar, tener en cuenta que si no hay miembros en la página que se proporcione aparecerá un null_

[members](http://localhost:3000/members?page=1)

```
{
    "page":1
}
```
_Para visualizar nombre e imagen de los miembros, es obligatorio estar autenticado como administrador_

[members](http://localhost:3000/members/attributes)

_Para crear un miembro tendrás que llenar todos los datos de este esquema en el body correspondiente, acá un pequeño ejemplo:_

```
{
    "nameMember": "member",
    "facebookUrl": "https:/facebook.com/member",
    "instagramUrl": "https:/instagram.com/member",
    "linkedinUrl": "https:/linkedin.com/in/member",
    "image": "member.jpg",
    "description": "member"
}
```

_Para actualizar la información de un miembro, tendrás que proporcionar el id y llenar todos los datos de este esquema en el body correspondiente, acá un pequeño ejemplo:_

```
{
    "id":1
}
```

```
{
    "nameMember": "member",
    "facebookUrl": "https:/facebook.com/member",
    "instagramUrl": "https:/instagram.com/member",
    "linkedinUrl": "https:/linkedin.com/in/member",
    "image": "member.jpg",
    "description": "member"
}
```

[members](http://localhost:3000/members/update/1)

_Para eliminar un miembro, tendrás que proporcionar el id_

```
{
    "id":1
}
```
[members](http://localhost:3000/members/delete/1)