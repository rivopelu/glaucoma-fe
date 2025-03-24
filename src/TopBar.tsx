import { Link } from "react-router-dom";

export function TopBar() {
  return (
    <div className={'h-top-bar-height bg-white border-b fixed top-0 w-screen flex items-center justify-between px-10'}>
      <h1 className={'tracking-wide'}>GLAUCOMA PREDICTION</h1>
      <div className="flex gap-4">
        <Link className="hover:text-primary-dark hover:underline" to={"/"}>Prediction</Link>
        <Link className="hover:text-primary-dark hover:underline" to={"/confusion"}>Confution Matrix</Link>
      </div>
    </div>
  );
}
