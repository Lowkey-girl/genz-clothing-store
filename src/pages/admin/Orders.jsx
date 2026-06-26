import { useEffect, useState } from "react";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  const updateStatus = async (id, status) => {

  const res = await fetch(
    `http://localhost:3000/api/orders/${id}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await res.json();

  if (data.success) {

    // Reload orders
    fetch("http://localhost:3000/api/orders")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
      });

  } else {
    alert("Update failed");
  }

};

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-3">ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
<th>Action</th>

          </tr>

        </thead>

        <tbody>

          {orders.map(order => (

            <tr
              key={order.id}
              className="border-t text-center"
            >

              <td>{order.id}</td>

              <td>{order.username}</td>

              <td>{order.email}</td>

              <td>${order.total_price}</td>

              <td>{order.status}</td>

              <td>
  {new Date(order.created_at).toLocaleDateString()}
</td>

<td>
  <button
    onClick={() => updateStatus(order.id, "approved")}
    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
  >
    Approve
  </button>

  <button
    onClick={() => updateStatus(order.id, "rejected")}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Reject
  </button>
</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}