import { useEffect, useState } from "react";

export default function Orders() {
  console.log("Orders component loaded");
 const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    fetch("http://localhost:3000/api/orders")
      .then((res) => res.json())
      .then((data) => {
  console.log("API DATA:", data);
  console.log("Length:", data.length);
  setOrders(data);
})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:3000/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    loadOrders();
  };

  return (
    <div className="p-6 pt-24">
      <h1 className="text-white text-3xl mb-6">Orders</h1>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-gray-800">
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
              <tr key={order.id} className="border-t border-gray-700">
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
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order.id, "rejected")
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center text-gray-400 p-6">
            No Orders Found
          </div>
        )}
      </div>
    </div>
  );
}