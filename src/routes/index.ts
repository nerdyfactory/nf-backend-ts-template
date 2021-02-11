/*
 * @format
 */

import { Router } from "express";
import ping from "src/routes/ping";

const routes = Router();

routes.get("/ping", ping);

export default routes;
