/*
 * @format
 */

import { gql } from "apollo-server-express";
import express from "express";
import { User } from "src/entities";
import userResolver from "src/resolvers/User";
import {
  DateTimeResolver,
  URLResolver,
  EmailAddressResolver,
  JSONObjectResolver,
  JSONResolver,
} from "graphql-scalars";

export const typeDefs = [
  gql`
    type Query {
      root: String
    }
    type Mutation {
      root: String
    }
    type JSONData {
      key: String!
      value: String!
    }
    input JSONInput {
      key: String!
      value: String!
    }
    scalar DateTime
    scalar URL
    scalar EmailAddress
    scalar JSONObject
    scalar JSON
  `,
  userResolver.types,
];

export const resolvers = {
  DateTime: DateTimeResolver,
  URL: URLResolver,
  EmailAddress: EmailAddressResolver,
  JSONObject: JSONObjectResolver,
  JSON: JSONResolver,
  Query: {
    ...userResolver.queries,
  },
  Mutation: {
    ...userResolver.mutations,
  },
  ...userResolver.resolvers,
};

const BEARER_STRING = "Bearer ";
export const context = async ({
  req,
}: {
  req: express.Request;
}): Promise<{ user: User }> => {
  let token = req.headers.authorization || BEARER_STRING;
  token = token.replace(BEARER_STRING, "");

  const user = await User.findByToken(token);
  return {
    user,
  };
};
