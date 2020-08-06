# Greg and Ally's Recipe Book (v4)

## Purpose

- assist everyday cooking
- learn web-dev tech

## Tech Stack

- v1
  - UI: Jinja Template HTML, CSS, jQuery
  - Backend: Python Flask, PostgreSQL
  - Deployment: AWS EC2
- v2
  - UI: React, Semantic UI
  - Backend: Express.js, PostgreSQL
  - Deployment: AWS EC2, Docker
- v3
  - UI: React Hooks, Redux, Bulma
  - Backend: TypeScript, Express.js, MongoDB
  - Deployment: Heroku
- v4

  - UI: React Hooks, Redux Toolkit, Material UI, Google Sign-in
  - Backend: TypeScript, Express.js, MongoDB
  - Deployment: Heroku

  ## Local Development

  Comment/uncomment lines in `OauthAvatar.tsx` to use the clientId intended for local development

  In another terminal, start the ui:

  ```console
  $ npm start
  ```

  In one terminal, start the backend server with hot reloading using nodemon:

  ```console
  $ ADMIN_EMAILS='["<your@email.here>"]' MONGODB_URI=<mongo_conn_string> npm run start:dev
  ```

## Deploy

```console
$ git push heroku master
```
