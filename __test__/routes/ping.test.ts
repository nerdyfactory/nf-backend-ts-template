/*
 * @format
 */
import { client } from "__test__/helpers";

describe("ping", () => {
  it("returns pong", async () => {
    const res = await client.get("/api/ping");
    expect(res.body).toStrictEqual({ text: "pong" });
  });
});
