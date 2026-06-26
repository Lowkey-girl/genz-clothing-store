import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submit button clicked");

  const formData = new FormData();
  formData.append("receipt", file);
  formData.append("user_id", user.id);
  formData.append("total_price", total);
  formData.append("items", JSON.stringify(cart));

  console.log("Sending...");
  console.log("total =", total);
  console.log("cart =", cart);

  try {
  console.log("Logged in user:", user);
  const response = await fetch("http://localhost:3000/api/checkout", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  console.log(data);

  if (data.success) {
    setSuccess(true);
    setCart([]);

    // wait 1 second then go home
    setTimeout(() => {
      navigate("/Thanks");
    }, 1000);
  } else {
    setError("Checkout failed");
  }

} catch (err) {
  console.error(err);
}
};

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <button
  type="submit"
  onClick={() => console.log("Button clicked")}
  disabled={loading || !file}
  className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg"
>
  Complete Order
</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Instructions and Image */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Payment Instructions</h2>
            
            {/* Payment QR Code */}
            <div className="mb-8 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-4">
              <img
                src="/qr.png"
                alt="Payment QR Code"
                className="w-64 h-64 object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300?text=QR+Code";
                }}
              />
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="text-lg font-semibold">Bank Transfer Details:</p>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-500">
                <p><span className="font-semibold">Bank Name:</span> Sample Bank</p>
                <p><span className="font-semibold">Account Name:</span> Gen-Z Clothing</p>
                <p><span className="font-semibold">Account Number:</span> 1234567890</p>
                <p><span className="font-semibold">Amount:</span> ${total.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Please transfer the exact amount shown above. After payment, upload the transaction receipt below.
              </p>
            </div>
          </div>

          {/* Order Summary and Upload Form */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                    </div>
                    <p className="font-bold text-orange-500">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                <span>Total:</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Upload Transaction Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Upload Transaction Receipt</h2>

              {success ? (
                <div className="bg-green-50 border border-green-500 text-green-700 p-4 rounded-lg text-center">
                  <p className="font-bold text-lg">✓ Order submitted successfully!</p>
                  <p className="text-sm mt-2">Redirecting to dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-500 text-red-700 p-4 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 transition">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="receipt-upload"
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      <div className="space-y-2">
                        <div className="text-4xl">📸</div>
                        <p className="font-semibold">Upload Receipt</p>
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, or PDF (Max 5MB)
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Preview */}
                  {preview && (
                    <div className="space-y-2">
                      <p className="font-semibold">Preview:</p>
                      <img
                        src={preview}
                        alt="Receipt Preview"
                        className="w-full h-40 object-cover rounded-lg border border-gray-300"
                      />
                      <p className="text-sm text-gray-600">{file.name}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !file}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition duration-300"
                  >
                    {loading ? "Processing..." : "Complete Order"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition duration-300"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
