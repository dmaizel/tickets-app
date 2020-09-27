import Router from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  const onBlur = (e) => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            onBlur={onBlur}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {errors}
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
