import { Link, useLocation, useParams } from "react-router-dom";


export function TopBar() {
  const location = useLocation()
  return (
    <div className={`h-top-bar-height border-b absolute ${location.pathname != "/" ? " bg-primary-main" : " bg-transparent"}  top-0 text-white border-none w-screen flex items-center justify-between px-10`}>
      <h1 className={'tracking-wide'}>GLAUCOMA PREDICTION</h1>

      <div className="flex gap-4">
        <Link className=" hover:underline" to={"/"}>Prediction</Link>
        <Link className=" hover:underline" to={"/confusion"}>Confution Matrix</Link>
      </div>
    </div>
  );
}
