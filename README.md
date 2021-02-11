# Backend-typescript-template

## Installation

1. Make sure you have [**node**](https://nodejs.org/), [**yarn**](https://yarnpkg.com/), [**docker**](https://www.docker.com/products/docker-desktop) installed.
2. install dependencies

```
$ yarn install
```

3. running docker container

```
$ docker-compose up -d
```

4. running DB migration to check database is available

```
$ yarn typeorm migration:run #local
```

5. running test to check everything is fine

```
$ yarn test
```

## Running locally

```
$ yarn start
```

## Running scripts

Since scripts are written in TypeScript you need to use `ts-node`:

```
$ yarn ts-node path/to/the/script
```

## DB Migration

1. create new migration

```
yarn typeorm migration:create -n YourMigrationName
```

or you can just modify [entity](https://github.com/crispyan-dev/crispyan-backend/tree/master/src/entities) and generate migration from the modification

```
yarn typeorm migration:generate -n YourMigrationName
```

2. run migration

```
yarn typeorm migration:run
```

3. rollback migration

```
yarn typeorm migration:revert
```

for more information on `typeorm` cli command.

just run

```
yarn typeorm
```

## Project Structure

- `dist/`: wepback bundle file
- `docker/`: docker related file. Currently, it has db init script.
- `src/`: source codes
  - `src/entities`: Entity definations
  - `src/lib`: Shared library files
  - `src/migrations`: DB migration files
  - `src/resolvers`: [graphql](https://www.apollographql.com/docs/) type defs and resolvers
  - `src/routes`: [express](https://www.expressjs.com/) routes
  - `src/Api.ts`: API server
- `__test__/`: test scripts
- `scripts/`: miscellaneous scripts
- `READ.md`: this file
- `docker-compose.yml`: docker config for development and test database
- `ecosystem.config.js`: pm2 deployment config
- `ormconfig.js`: database connection config
- `package.json`: node dependencies and command scripts
- `tsconfig.json`: typescript compile options
- `eslint.json`: [eslint](https://eslint.org/) config
- `webpack.config.js`: webpack config
- `.env.local`: environment variables to load for `local` NODE_ENV
- `.env.test`: environment variables to load for `test` NODE_ENV
- `babel.config.js`: load babel presets for code transpilation
- `jest.config.js`: test configuration (paths of files to test)
- `nodemon.json`: nodemon setting(run nodemon using ts-node and watch the changes)
