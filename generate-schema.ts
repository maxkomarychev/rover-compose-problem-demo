import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { UsersResolver } from './src/users/users.resolver';
import { printSchema } from 'graphql';
import { printSubgraphSchema } from '@apollo/subgraph';

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([UsersResolver]);
    console.log(printSchema(schema));
  console.log(printSubgraphSchema(schema));
}

generateSchema();
