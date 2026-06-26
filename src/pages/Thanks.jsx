import { Link } from "react-router-dom";

export default function Thanks() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-green-600">
        🎉 Thank You!
      </h1>

      <p className="mt-4 text-xl">
        Your order has been placed successfully.
      </p>

      <Link
  to="/"
  onClick={() => window.scrollTo(0, 0)}
  className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg"
>
  Continue Shopping
</Link>
    </div>
  );
}