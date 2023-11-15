import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="absolute left-0 top-0 ml-10 pt-10 text-2xl font-bold">
        <span className="text-3xl">A</span>
        <span className="-ml-2">M</span>
      </div>
    </Link>
  );
}

export default Logo;
