/*
 * @format
 */

import { createConnection, Connection, getConnectionOptions } from "typeorm";

let connection: Connection;

global.beforeAll(() => {
  return getConnectionOptions().then((options) => {
    return createConnection(options).then((c) => {
      connection = c;
    });
  });
});

global.afterAll(() => {
  if (connection) {
    return connection.close();
  }
});
