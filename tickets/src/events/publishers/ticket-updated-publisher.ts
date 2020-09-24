import { Publisher, Subjects, TicketUpdatedEvent } from "@dmatickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
