import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51HVcelLRSGIwMFan0rXGm3LesE1LtyjKKulm5zpXu6N1f5u7i6Z7I15QREOlVNU6Y22XdGcyvC0aMdSkL151b1TP005MyKOEtc",
  {
    apiVersion: "2020-08-27",
  }
);
