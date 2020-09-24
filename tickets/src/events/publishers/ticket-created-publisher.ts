import { Publisher, Subjects, TicketCreatedEvent } from "@dmatickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
