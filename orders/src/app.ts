const express = require("express");
import { currentUser, errorHandler, NotFoundError } from "@dmatickets/common";
import cookieSession from "cookie-session";
import { Request } from "express";
import "express-async-errors";
import { Result } from "express-validator";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";
import { createOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
const { json } = require("body-parser");

const app = express();
app.set("trust-proxy", true);
app.enable("trust proxy"); //needed if you're behind a load balancer
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(indexOrderRouter);
app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async (req: Request, res: Result) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
