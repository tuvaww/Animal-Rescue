import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Close from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import "../../styles/layout/Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../redux/models/IState";
import { Account } from "../Account";

export const Header = () => {
  const [isHovering, setIsHovering] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [openAccount, setOpenAccount] = useState(false);
  const token = useSelector((state: IState) => state.session.value);
  const dispatch = useDispatch();
  const url = window.location.pathname;

  const links = [
    { url: "/", name: "Home", id: 1 },
    { url: "/Login", name: "Login", id: 2 },
    { url: "/Register", name: "Register", id: 3 },
    { url: "/Adopt", name: "Adopt", id: 4 },
    { url: "/Schedule", name: "Schedule", id: 5 },
    { url: "/Checkout", name: "Checkout", id: 6 },
  ];

  const loggedInLinks = [
    { url: "/Donate", name: "Donate", id: 7 },
    { name: "Account", id: 8 },
  ];

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleMouseEnter = (id: number) => {
    setIsHovering(id);
  };
  const handleMouseLeave = () => {
    setIsHovering(0);
  };

  const handleModalMenu = (clickedButton: String) => {
    if (clickedButton === "open") {
      setOpenMenu(true);
    } else if (clickedButton === "close") {
      setOpenMenu(false);
    }
  };

  const handleOpenAccount = (link: string) => {
    if (link === "Account") {
      setOpenAccount(true);
    }
  };

  const closeAccount = (set: boolean) => {
    setOpenAccount(set);
  };

  const getLinkHTML = links.map((link) => {
    return (
      <div
        onMouseEnter={() => handleMouseEnter(link.id)}
        onMouseLeave={handleMouseLeave}
        className={`${
          isHovering === link.id || url === link.url
            ? "hoverHeaderLinkContainer"
            : "headerLinkContainer"
        } `}
        key={link.id}
      >
        <a
          href={link.url && link.url}
          className={`${
            isHovering === link.id || url === link.url ? "hoverLink" : "link"
          } `}
        >
          {link.name}
        </a>
      </div>
    );
  });

  const getLoggedInLinksHTML = loggedInLinks.map((link) => {
    return (
      <div
        onMouseEnter={() => handleMouseEnter(link.id)}
        onMouseLeave={handleMouseLeave}
        className={`${isLoggedIn ? "loggedInLink" : "hide"} ${
          isHovering === link.id || url === link.url
            ? "hoverHeaderLinkContainer"
            : "headerLinkContainer"
        }  `}
        key={link.id}
      >
        <a
          onClick={() => handleOpenAccount(link.name)}
          href={link.url}
          className={`${isHovering === link.id ? "hoverLink" : "link"} ${
            url === link.url && "hoverHeaderLinkContainer"
          } `}
        >
          {link.name}
        </a>
      </div>
    );
  });

  return (
    <header className="headerMainContainer">
      <div className={`${openAccount ? "account" : "hide"}`}>
        <Account closeAccount={closeAccount} />
      </div>
      <div className="headerName">
        <h1>Animal Rescue</h1>

        <div
          className="hamburgerContainer"
          onClick={() => handleModalMenu("open")}
        >
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
        </div>
      </div>

      <section
        className={`${openMenu ? "hamburgerMenuModalConatiner" : "hideMenu"}`}
      >
        <article className="hamburgerMenuModal">
          <div className="closeMenuButton">
            <Close
              sx={{ cursor: "pointer", color: "gray" }}
              onClick={() => handleModalMenu("close")}
            ></Close>
          </div>
          {getLinkHTML}
          {getLoggedInLinksHTML}
        </article>
      </section>
      {/*   <ShoppingBasketIcon
        sx={{ margin: "10px", position: "absolute", right: "0" }}
      /> */}

      <section className="headerLinksConatiner">
        <article className="mainLinks">{getLinkHTML}</article>

        <article className={`${isLoggedIn ? "loggedInLinks" : "hide"}`}>
          {getLoggedInLinksHTML}
        </article>
      </section>
    </header>
  );
};
