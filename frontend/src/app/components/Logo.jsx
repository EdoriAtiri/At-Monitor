import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="text-2xl font-bold">
        <span className="text-3xl">A</span>
        <span className="-ml-2">M</span>
      </div>
    </Link>
  );
}

export default Logo;
