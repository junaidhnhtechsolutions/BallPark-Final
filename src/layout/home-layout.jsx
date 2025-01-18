import Cursor from "../components/ui/cursor";
import Header from "../components/ui/header";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <>
      <div className="md:block hidden">
        <Cursor />
      </div>
      <Header />
      <Outlet />
    </>
  );
}


