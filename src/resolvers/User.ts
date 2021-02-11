/*
 * @format
 */

import {
  gql,
  AuthenticationError,
  ForbiddenError,
} from "apollo-server-express";
import { User } from "src/entities";
import { ensureUser, IResolvers } from "src/resolvers/shared";
import { ensureResource } from "src/resolvers/shared";

const types = gql`
  type User {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
    email: EmailAddress
    name: String
    phoneNumber: String
    jwt: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
    passwordConfirm: String!
    name: String
    phoneNumber: String
  }

  input UserUpdateInput {
    name: String
    phoneNumber: String
  }

  extend type Query {
    me: User
    userShow(id: ID!): User
  }

  extend type Mutation {
    login(input: LoginInput!): User
    signUp(input: SignUpInput!): User
    userCreate(input: SignUpInput!): User
    userDelete(id: ID!): User
  }
`;

const queries: IResolvers = {
  me: ensureUser(
    (obj: any, args: any, { user }: { user: User | undefined }) => user
  ),
  userShow: ensureUser(
    ensureResource(User, (obj: any, args: any, { resource }) => resource)
  ),
};

const mutations: IResolvers = {
  login: async (obj: any, args: any, _context) => {
    const { email, password } = args.input;
    const user = await User.createQueryBuilder("user")
      .where("email = :email", { email })
      .getOne();

    if (!user) throw new AuthenticationError("사용자가 없습니다.");
    if (!user.comparePassword(password))
      throw new AuthenticationError("비밀번호가 다릅니다.");

    return user;
  },
  signUp: async (obj: any, args: any, _context) => {
    const { email, password, name, phoneNumber, passwordConfirm } = args.input;
    if (password !== passwordConfirm) {
      throw new ForbiddenError("비밀번호 확인이 일치하지 않습니다.");
    }
    let user = new User({
      email,
      name: name || "",
      phoneNumber: phoneNumber || "",
    });
    user.password = password;
    user = await user.save();
    return user;
  },
  userCreate: ensureUser(async (obj: any, args: any, _context) => {
    const { email, password, name, phoneNumber, passwordConfirm } = args.input;
    if (password !== passwordConfirm) {
      throw new ForbiddenError("비밀번호 확인이 일치하지 않습니다.");
    }
    let user = new User({
      email,
      name: name || "",
      phoneNumber: phoneNumber || "",
    });
    user.password = password;
    user = await user.save();
    return user;
  }),
};

const resolvers: IResolvers = {};

export default {
  types,
  queries,
  mutations,
  resolvers,
};
