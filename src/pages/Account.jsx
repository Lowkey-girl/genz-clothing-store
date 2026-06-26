import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Account() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/api/my-orders/${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="min-h-screen pt-24 px-10 bg-gray-100">

      <h1 className="text-4xl font-bold mb-6">
        My Account
      </h1>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <p><b>Username:</b> {user?.username}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        My Orders
      </h2>

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow p-5"
          >
            <h3 className="font-bold">
              Order #{order.id}
            </h3>

            <p>Total: ${order.total_price}</p>

            <p>Status: {order.status}</p>

            <p>
              Date:{" "}
              {new Date(order.order_date).toLocaleDateString()}
            </p>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="bg-white rounded-lg p-5">
            No orders yet.
          </div>
        )}

      </div>

    </div>
  );
}