import Router from "next/router";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const secondsLeft = (new Date(order.expiresAt) - new Date()) / 1000;
      setTimeLeft(Math.round(secondsLeft));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft <= 0) {
    return <h1>Order Expired</h1>;
  }

  return (
    <div>
      <h1>Purchasing {order.ticket.title}</h1>
      <p>Time left to pay: {timeLeft} seconds</p>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51HVcelLRSGIwMFanQJwvySuJwymTrRu1JipQyB2EOz5LyNMayD9hvGnEd24Xjn46ISapKarzcKV4VJsEJhHUZa7u00RyOiZTM3"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
