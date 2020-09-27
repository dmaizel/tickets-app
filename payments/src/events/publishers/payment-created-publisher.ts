import { PaymentCreatedEvent, Publisher, Subjects } from "@dmatickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
