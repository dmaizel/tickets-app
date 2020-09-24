import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  const title = "concert";
  const price = 20;
  const cookie = global.signin();

  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price });
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
