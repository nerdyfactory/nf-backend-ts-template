/*
 * @format
 */
import app from "src/routes/app";
import request from "supertest";

const client = request(app);
export { client };
