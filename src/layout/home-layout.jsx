import Cursor from "../components/ui/cursor";
import Header from "../components/ui/header";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <>
    <Cursor/>
      <Header/>
      <Outlet />
    </>
  );
}


