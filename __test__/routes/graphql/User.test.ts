/*
 * @format
 */
import { client } from "__test__/helpers";
import factories from "__test__/factories";
import { User } from "src/entities";
import { random, internet, name } from "faker";

const ME = `
{
  me {
    id
  }
}
`;

const USER_SHOW = (id: string) => `
{
  userShow(id: "${id}") {
    id
  }
}
`;

const LOGIN = `
mutation Login($input: LoginInput!) {
  login(input: $input) {
    id
    jwt
  }
}
`;

const SIGN_UP = `
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    id
    jwt
    name
    phoneNumber
  }
}
`;

const USER_CREATE = `
mutation UserCreate($input: SignUpInput!) {
  userCreate(input: $input) {
    id
    jwt
    name
    phoneNumber
  }
}
`;

describe("User resolver", () => {
  describe("me query", () => {
    let user: User;
    beforeEach(async () => {
      user = factories.userFactory();
      user = await user.save();
    });

    it("returns id", async () => {
      const res = await client
        .post("/api/graphql")
        .send({ query: ME })
        .auth(user.jwt, { type: "bearer" });

      const { data, errors } = res.body;
      expect(errors).toBeFalsy();
      expect(data).toStrictEqual({ me: { id: user.id } });
    });
  });

  describe("userShow query", () => {
    let user: User;
    beforeEach(async () => {
      user = factories.userFactory();
      user = await user.save();
    });

    it("returns id", async () => {
      const res = await client
        .post("/api/graphql")
        .send({ query: USER_SHOW(user.id) })
        .auth(user.jwt, { type: "bearer" });

      const { data, errors } = res.body;
      expect(errors).toBeFalsy();
      expect(data).toStrictEqual({
        userShow: { id: user.id },
      });
    });
  });

  describe("login mutation", () => {
    let user: User;
    let password: string;
    beforeEach(async () => {
      user = factories.userFactory();
      password = random.word();
      user.password = password;
      user = await user.save();
    });

    it("returns jwt", async () => {
      const res = await client.post("/api/graphql").send({
        query: LOGIN,
        variables: {
          input: {
            email: user.email,
            password,
          },
        },
      });

      const { data, errors } = res.body;
      expect(errors).toBeFalsy();
      expect(data).toStrictEqual({
        login: { id: user.id, jwt: user.jwt },
      });
    });
  });

  describe("userCreate mutation ", () => {
    let authUser: User;
    let password: string;
    let email: string;
    let username: string;
    const phoneNumber = random.word();
    beforeEach(async () => {
      authUser = factories.userFactory();
      authUser = await authUser.save();
      password = random.word();
      email = internet.email();
      username = name.findName();
    });

    it("returns jwt and assigns random ", async () => {
      const res = await client
        .post("/api/graphql")
        .send({
          query: USER_CREATE,
          variables: {
            input: {
              email,
              password,
              passwordConfirm: password,
              name: username,
              phoneNumber,
            },
          },
        })
        .auth(authUser.jwt, { type: "bearer" });

      const { data, errors } = res.body;
      expect(errors).toBeFalsy();
      const user = await User.createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();
      expect(data).toStrictEqual({
        userCreate: {
          id: user.id,
          jwt: user.jwt,
          phoneNumber: user.phoneNumber,
          name: user.name,
        },
      });
    });
  });

  describe("signUp mutation", () => {
    let password: string;
    let email: string;
    let username: string;
    const phoneNumber = random.word();
    beforeEach(async () => {
      password = random.word();
      email = internet.email();
      username = name.findName();
    });

    it("returns jwt and assigns random ", async () => {
      const res = await client.post("/api/graphql").send({
        query: SIGN_UP,
        variables: {
          input: {
            email,
            password,
            passwordConfirm: password,
            name: username,
            phoneNumber,
          },
        },
      });

      const { data, errors } = res.body;
      expect(errors).toBeFalsy();
      const user = await User.createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();
      expect(data).toStrictEqual({
        signUp: {
          id: user.id,
          jwt: user.jwt,
          phoneNumber: user.phoneNumber,
          name: user.name,
        },
      });
    });
  });
});
