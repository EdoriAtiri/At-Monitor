import { FaPlus } from "react-icons/fa6";

const members = [
  {
    avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
    name: "John lorin",
    email: "john@example.com",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    name: "Chris bondi",
    email: "chridbondi@example.com",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    name: "yasmine",
    email: "yasmine@example.com",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
    name: "Joseph",
    email: "joseph@example.com",
  },
];

const EventRegister = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-800"> Registration</h4>
        </div>
        <button className="grid h-8 w-8 place-content-center rounded-full bg-sky-400 transition-all hover:bg-slate-400 focus:border active:scale-95">
          <FaPlus />
        </button>{" "}
      </div>

      <ul className="mt-12 divide-y">
        {members.map((item, index) => (
          <li key={index} className="flex items-start justify-between py-3">
            <div className="flex items-center gap-5">
              <span className="font-bold">{index + 1}</span>
              <div>
                <span className="block text-sm font-semibold text-gray-700">
                  {item.name}
                </span>
                <span className="block text-sm text-gray-600">
                  {item.email}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventRegister;
