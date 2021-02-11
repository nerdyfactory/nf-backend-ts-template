/*
 * @format
 */
import express from "express";

const ping = (req: express.Request, res: express.Response): void => {
  res.json({ text: "pong" });
};

export default ping;
