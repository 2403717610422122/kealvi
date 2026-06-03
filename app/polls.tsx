export default function Polls() {
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Poll List</h2>

      <div className="rounded-lg border p-4 mb-4">
        <h3 className="font-semibold">Best Programming Language?</h3>

        <button className="block w-full rounded border p-2 mt-2 text-left">
          Python
        </button>

        <button className="block w-full rounded border p-2 mt-2 text-left">
          Java
        </button>

        <button className="block w-full rounded border p-2 mt-2 text-left">
          JavaScript
        </button>

        <button className="block w-full rounded border p-2 mt-2 text-left">
          C++
        </button>
      </div>
    </div>
  );
}