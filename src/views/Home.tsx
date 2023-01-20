import "../styles/views/home.scss";
import PetsIcon from "@mui/icons-material/Pets";
import SavingsIcon from "@mui/icons-material/Savings";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../redux/models/IState";
export const Home = () => {
  const token = useSelector((state: IState) => state.session.value);
  const dispatch = useDispatch();

  return (
    <main className="mainContainer">
      <section className="mainContent">
        <Header></Header>
        <section className="homePageImage"></section>
        <section className="cardMainContainer">
          <article className="cardContainer">
            <h5 className="cardHeader">About us</h5>
            <div className="textContainer">
              <span>
                Animal Rescue is not a profit-driven company that runs on
                donations and help from volunteers. We have been in Malaga for
                40 years and have helped over 5000 homeless animals over the
                years.
              </span>
            </div>
          </article>
          <article className="cardSmallContainerFirst">
            <h5 className="cardHeader">Donate to help</h5>
            <div className="textContainer">
              <a href={token ? "/Donate" : "/Login"}>
                <SavingsIcon sx={{ fontSize: "60pt" }}></SavingsIcon>
              </a>
            </div>
          </article>
          <article className="cardSmallContainerSecond">
            <h5 className="cardHeader">Adopt a animal</h5>
            <div className="textContainer">
              <a href="/Adopt">
                <PetsIcon sx={{ fontSize: "60pt" }}></PetsIcon>
              </a>
            </div>
          </article>
          <article className="cardContainer">
            <h5 className="cardHeader">Volonteer</h5>
            <div className="textContainer">
              <span>
                Animal Rescue is not a profit-driven company that runs on
                donations and help from volunteers. We have been in Malaga for
                40 years and have helped over 5000 homeless animals over the
                years.
              </span>
            </div>
          </article>
        </section>
      </section>
      <Footer></Footer>
    </main>
  );
};
