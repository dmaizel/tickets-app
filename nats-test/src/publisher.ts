import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect("blah", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const data = { title: "some title", price: 10, id: "some_id" };

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish(data);
  } catch (err) {
    console.log(err);
  }
});
