import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <main className="mainWebContainer">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </main>
  );
};
