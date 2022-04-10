import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import {} from 'apollo-server-types';
import http from 'http';
import express from 'express';
import { GraphQLScalarType } from 'graphql';
import graphQLResolvers from './resolvers';
import schema from './schema';
import routes from './routes';
import UserDetails from './models/User';

const startApolloServer = async (typeDefs: any, resolvers: any) => {
  const app = express();
  const httpServer = http.createServer(app);
  const Any = new GraphQLScalarType({
    name: 'Any',
    description: 'Any type',
    serialize(value) {
      return value;
    },
    parseValue(value) {
      return value;
    },
    parseLiteral(value) {
      return value;
    }
  });
  app.use(express.json());
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Any,
      ...resolvers,

    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });
  app.use('/api', routes);

  await new Promise<void>(resolve => httpServer.listen({ port: 4001 }, resolve));
  // tslint:disable-next-line:no-console
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
}

startApolloServer(schema, graphQLResolvers);