import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@dmatickets/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
