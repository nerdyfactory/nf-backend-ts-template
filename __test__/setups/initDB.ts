/*
 * @format
 */

import { createConnection, getConnectionOptions } from "typeorm";

getConnectionOptions().then((options) => {
  return createConnection({
    ...options,
    dropSchema: true,
    migrationsRun: true,
  })
    .then((c) => c.close())
    .then(() => process.exit());
});
