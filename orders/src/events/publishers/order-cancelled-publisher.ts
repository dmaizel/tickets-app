import { OrderCancelledEvent, Publisher, Subjects } from "@dmatickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
