import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa6";

const EventRegister = () => {
  const { myEvent } = useSelector((state) => state.myEvents);
  return (
    // Actions
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-800"> Registration</h4>
        </div>
        <button className="grid h-8 w-8 place-content-center rounded-full bg-sky-400 transition-all hover:bg-slate-400 focus:border active:scale-95">
          <FaPlus />
        </button>{" "}
      </div>

      {/* List of registered*/}
      <div className="mt-6 overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full table-auto text-left text-sm">
          <thead className="border-b bg-gray-50 font-medium text-gray-600">
            <tr>
              <th className="px-6 py-3">S/N</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone No</th>
              <th className="px-6 py-3">First Time</th>
              <th className="px-6 py-3">Gender</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-600">
            {Array.isArray(myEvent.registered) &&
            myEvent.registered.length > 0 ? (
              myEvent.registered.map((item, index) => (
                <tr
                  className="cursor-pointer capitalize transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  key={index}
                >
                  <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                  <td className="capit whitespace-nowrap px-6 py-4">
                    {item.fullName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.phone}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.firstTimer ? "Yes" : "No"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.gender}</td>
                </tr>
              ))
            ) : (
              <div>No registered user</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventRegister;
