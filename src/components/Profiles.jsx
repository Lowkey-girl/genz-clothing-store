export default function Profiles({ user }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-neutral-900 p-6 rounded-xl">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mt-2">
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </>
  );
}
