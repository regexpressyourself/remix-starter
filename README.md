# Remix starter template

<p align="middle" float="left">
  <img src="https://images.smessina.com/public/screens/remix-starter/default.png#" width="200" />
  <img src="https://images.smessina.com/public/screens/remix-starter/blue.png#" width="200" /> 
  <img src="https://images.smessina.com/public/screens/remix-starter/green.png#" width="200" /> 
  <img src="https://images.smessina.com/public/screens/remix-starter/purple.png#" width="200" /> 
  <img src="https://images.smessina.com/public/screens/remix-starter/peachy.png#" width="200" /> 
</p>

## Themes and customization

Themes can be changed in [`manifest.json`](./app/manifest.json). Available themes are:

- `default`
- `peachy`
- `green`
- `purple`
- `blue`

The `manifest.json` file is also where you can change the title, description, favicon, etc.. These changes will propogate across the app as required.

## Setup

### 0. Install required global packages

```
npm install -g prettier concurrently
```

### 1. `.env` file

Create up a .env file in the repo root with the following. Ignore the auth stuff if you don't need auth.

Make sure to change the `SESSION_SECRET` upon creation ([more information](https://developer.okta.com/blog/2021/06/07/session-mgmt-node#session-secret)).

Also notice the `PORT` variable, which can be changed to run the application on a port other than `3000`.

```
echo "SESSION_SECRET=<session_secret>" > .env
echo "PORT=3000" >> .env

echo "DATABASE_URL=postgresql://<user>:<password>@localhost/<db_name>" >> .env

echo "AUTH_DOMAIN=<subdomain>.auth0.com" >> .env
echo "AUTH_CALLBACK_URL=http://localhost:3000/callback" >> .env
echo "AUTH_CLIENT_ID=<auth0_client_id>" >> .env
echo "AUTH_CLIENT_SECRET=<auth0_client_secret>" >> .env
```

### 2. Auth0

Auth0 is used for user authentication. Ignore this section if your application will not require user registration.

1. Set up an account on [Auth0](https://auth0.com/signup?place=header&type=button&text=sign%20up)
2. Add your Auth0 details to the `.env` file (detailed above)

### 3. Database

This template uses a [PostgreSQL](https://www.postgresql.org/) database and the [prisma](https://www.prisma.io/) ORM for management.

1. Set up a PostgreSQL database ([instructions](https://gist.github.com/regexpressyourself/0aa4b65af6fae58fe68cdb83de0c2d18)).
2. Make sure the database's user, password, and db name are updated in the `.env` file's `DATABASE_URL` variable.
3. Run `npx prisma db push`
4. See your database with `npx prisma studio`

### 4. Run the application

```
npm run dev
```

Or for production:

```
npm run sass
npm run build
npm start
```

### Other useful scripts

Check typescript linting:

```
npm run tsc
```

See routes:

```
npm run routes
```
