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
### Members

#### Members per page

- Set the page you wanna see

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-93/public/images/Page.PNG?raw=true)

- If the page that you set doesn't have content to show, it is gonna display this

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-93/public/images/null.PNG?raw=true)

#### Attributes of the members

- To display some members' attributes, such as name and image, log in as an administrator (the data of the administrators will be provided only by the developers).

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-93/public/images/token.PNG?raw=true)

#### To create a new member inside the database

You only need to complete every field in the next schema to create in a successfully way a new member.

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-93/public/images/body.PNG?raw=true)

- nameMember is the name of the member
- facebookUrl is the url address of the facebook page of the member
- instagramUrl is the url address of the instagram page of the member
- linkedinUrl is the url address of the linkedin page of the member
- image is gonna be the image that the member will show to the world
- description is about the rol of the member inside the organization

#### To update a member's information inside the database

You only need to complete every field in the next schema to update the information of a member

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-93/public/images/update.PNG?raw=true)

- id is gonna be the identification of the member you wanna update
- nameMember is the name of the member
- facebookUrl is the url address of the facebook page of the member
- instagramUrl is the url address of the instagram page of the member
- linkedinUrl is the url address of the linkedin page of the member
- image is gonna be the image that the member will show to the world
- description is about the rol of the member inside the organization

#### To delete a member's information from the database

![EJEMPLO](https://github.com/alkemyTech/OT266-server/blob/OT266-93/public/images/id.PNG?raw=true)

- id is gonna be the identification of the member you wanna delete