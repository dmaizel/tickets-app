import { OrderStatus } from "@dmatickets/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Payment } from "../../models/payment";
import { stripe } from "../../stripe";

it("returns 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "dasads",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns 401 when purchasing an order that doesnt belong to the user", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: orderId,
    price: 10,
    status: OrderStatus.Created,
    userId: "dasadsasd",
    version: 0,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "dasads",
      orderId: order.id,
    })
    .expect(401);
});

it("returns 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Cancelled,
    userId,
    version: 0,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "dasads",
      orderId: order.id,
    })
    .expect(400);
});

it("returns a 201 with valid inputs", async () => {
  jest.setTimeout(1000 * 100);
  const userId = mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    price,
    status: OrderStatus.Created,
    userId,
    version: 0,
  });

  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

  // A bit tricky implemenation to make sure the charge was applied, without changing
  // the implementation of the route response specifically for this test.
  const stripeCharges = await stripe.charges.list({ limit: 10 });
  const stripeCharge = stripeCharges.data.find(
    (charge) => charge.amount === price * 100
  );

  expect(stripe).toBeDefined();
  expect(stripeCharge!.currency).toEqual("usd");

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id,
  });
  expect(payment).not.toBeNull();
});
