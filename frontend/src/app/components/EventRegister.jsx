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
      <ul className="mt-12 divide-y">
        {Array.isArray(myEvent.registered) && myEvent.registered.length > 0 ? (
          myEvent.registered.map((item, index) => (
            <li key={index} className="flex items-start justify-between py-3">
              <div className="flex items-center gap-5">
                <span className="font-bold">{index + 1}</span>
                <div>
                  <span className="block text-sm font-semibold text-gray-700">
                    {item.fullName}
                  </span>
                  <span className="block text-sm text-gray-600">
                    {item.email}
                  </span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div>none</div>
        )}
      </ul>
    </div>
  );
};

export default EventRegister;
