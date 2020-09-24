const express = require("express");
import { currentUser, errorHandler, NotFoundError } from "@dmatickets/common";
import cookieSession from "cookie-session";
import { Request } from "express";
import "express-async-errors";
import { Result } from "express-validator";
import { indexTicketRouter } from "./routes";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { updateTicketRouter } from "./routes/update";
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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req: Request, res: Result) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
