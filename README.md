# Microservice Example

This is a basic template of a microservice using an Express.js app with TypeScript, it also contains a basic implementation of Unit Testing with Jest, communication through a RabbitMQ server and GraphQL support.

The pitch of this boilerplate is to have a fully dockerized Express application able to work as RESTful microservice with GraphQL support, capable of communicating with other microservices through a RabbitMQ server (which may also be dockerized).

## Getting Started

To transform this boilerplate into a custom microservice, follow these steps:
- Update the following properties in the __package.json__: 
  - name
  - description
- Create an __.env__ variable with the same structure as the __.example.env__ file and update it with your own variables.
- Update the following properties in the __docker-compose.yaml__:
  - container_name
  - exposed ports to match the one defined at your __.env__ file

After these steps, you should have a very basic microservice. You may either run it locally by using these commands:
```bash
npm i && npm start
```
or you could create a Docker container using the following command:
```bash
docker-compose up -d
```

## About implementing TypeScript

To implement TypeScript in a Node.js project:
- Install TypeScript as a dev dependency:
```bash
npm i -D typescript
```
- Create a configuration file from the TypeScript library:
```bash
npx tsc --init
```
- Update the __tsconfig.json__ file to make sure you have these properties in the _compilerOptions_:
```,
"rootDir": "./src",
"moduleResolution": "node",
"inlineSourceMap": true,
"outDir": "./dist",
```

Now, everytime you run the _tsc_ command, it should build a __dist__ folder with all the code found in the __src__ folder transpiled into JavaScript code.

## About implementing Unit Testing

To implement an environment suitable for Unit Testing in a Node.js + TypeScript project:
- Install the required dependencies:
```bash
npm i -D jest ts-jest supertest @types/jest @types/supertest
```
- Create a basic configuration file using the ts-jest library:
```bash
npx ts-jest config:init
```
- Update the __tsconfig.json__ file to exclude the tests folder by adding the following property after the _compilerOptions_:
```
"exclude": [
  "tests"
]
```

At the root of the project you should create a __tests__ folder which should mirror the __src__ folder and start writing your own test cases!

## About implementing GraphQL

To integrate GraphQL in an Express.js project, follow these steps:
- Install the required dependencies:
```bash
npm i graphql @apollo/server @graphql-tools/load-files
```
- Inside a folder (can be named just __graphql__), create a basic __schema.graphql__ file and define a simple _Query_ object:
```
type Query {
  hello: String
}
```
- Create another folder which should be responsible for defining the __resolvers__ and make sure to export a single _resolvers_ object:
```
export const resolvers = {
  Query: {
    hello: () => "..."
  }
}
```
- Now at the root of the __graphql__ folder, create another file with the following code:
```
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { loadFiles } from "@graphql-tools/load-files";
import type { Express } from "express";

import { resolvers } from "./resolvers";

export const useGraphQL = async (app: Express) => {
  const server = new ApolloServer({
    typeDefs: [
      ...(await loadFiles("./src/graphql/schema.graphql")),
    ],
    resolvers,
  });

  await server.start();

  app.use(expressMiddleware(server));
}
```

Now at the Class or Function where you defined your Express app, you should implement the _useGraphQL_ function and pass your app as a parameter, now you should be able to access GraphQL through the _/graphql_ endpoint.


