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

## Authorization

Estos endpoints sirven para autenticarse usando el estandar de seguridad basado en tokens JWT (JSON Web Token).

### Para Registrarse

_En este endpoint se puede registrar un nuevo usuario, es necesario agregar los datos minimos y necesarios._

_(no es necesario estar autenticado para acceder a este endpoint)_

Los campos obligatorios son:

- firstName (primer nombre)
- lastName (apellido)
- email (correo electronico)
- password (contraseña)

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-95/public/images/registerBody.png?raw=true)

Una vez registrado se enviara un email de bienvenida al correo electronico del usuario creado anteriormente.

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-95/public/images/welcome.png?raw=true)

En caso de que falten campos, se devolvera una respuesta con codigo de estado 400 (Bad Request).

En caso de que el usuario ya exista, se devolvera una respuesta con codigo de estado 409 (Conflict).

### Para Logearse

  _En este endpoint obtendremos el token de autenticacion que nos permitira tener acceso al resto de las funcionalidades_

  Estos campos son obligatorios:
  
  - email (correo electronico)

  - password (contraseña)

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-95/public/images/loginBody.png?raw=true)


Si los campos son correctos se devolvera un codigo de estado 200 (OK) y como respuesta los datos del usuario junto al token JWT.

En el caso de que los datos sean incorrectos se devolvera un codigo de estado 400 (Bad Request) y en el caso de que el usuario no exista, un 404 (Not Found).

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-95/public/images/authResponse.png?raw=true)

### Para obtener la informacion del usuario autenticado

_Devuelve los datos del usuario autenticado._

Es obligatorio pasarle en el Header de la peticion el token JWT, pasandole como clave (Key) "Autorization" y como valor el token completo.





