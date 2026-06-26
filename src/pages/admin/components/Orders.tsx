import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    fetch("http://localhost:3000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setOrders(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

 const updateStatus = async (id, status) => {
  console.log("Updating:", id, status);

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

  console.log("Status Code:", res.status);

  const data = await res.text();
  console.log(data);

  loadOrders();
};

  return (
    <div className="p-6 pt-24">
      <h1 className="text-2xl text-white mb-5">Orders</h1>

      <div
        style={{
          background: "#111827",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            color: "white",
          }}
        >
          <thead>
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Total Price</th>
              <th className="p-4 text-left">Receipt</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-4">{order.id}</td>

                <td className="p-4">{order.username}</td>

                <td className="p-4">
                  ${Number(order.total_price).toFixed(2)}
                </td>

                <td className="p-4">
                  {order.receipt ? (
                    <img
                      src={`http://localhost:3000/uploads/${order.receipt}`}
                      alt="Receipt"
                      className="w-20 h-20 object-cover rounded cursor-pointer"
                      onClick={() =>
                        window.open(
                          `http://localhost:3000/uploads/${order.receipt}`,
                          "_blank"
                        )
                      }
                    />
                  ) : (
                    "No Receipt"
                  )}
                </td>

                <td className="p-4">{order.status}</td>

                <td className="p-4">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      updateStatus(order.id, "approved")
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order.id, "rejected")
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#aaa",
            }}
          >
            No Orders Found
          </div>
        )}
      </div>
    </div>
  );
}