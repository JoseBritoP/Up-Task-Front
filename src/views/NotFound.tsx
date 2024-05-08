import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-2xl text-white">
        Page not found
      </h1>
      <p className="mt-10 text-center text-white">
        Maybe you want to back a <Link className="text-fuchsia-500" to={'/projects'}>projects</Link>
      </p>
    </>
  );
}
