import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Close from "@mui/icons-material/Close";

import { useState } from "react";
import "../../styles/layout/Header.scss";

export const Header = () => {
  const [isHovering, setIsHovering] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const links = [
    { url: "", name: "Home", id: 1 },
    { url: "", name: "Login", id: 2 },
    { url: "", name: "Register", id: 3 },
    { url: "/Adopt", name: "Adopt", id: 4 },
  ];

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

  const getLinkHTML = links.map((link) => {
    return (
      <div
        onMouseEnter={() => handleMouseEnter(link.id)}
        onMouseLeave={handleMouseLeave}
        className={`${
          isHovering === link.id
            ? "hoverHeaderLinkContainer"
            : "headerLinkContainer"
        } `}
        key={link.id}
      >
        <a
          href={link.url}
          className={`${isHovering === link.id ? "hoverLink" : "link"} `}
        >
          {link.name}
        </a>
      </div>
    );
  });

  return (
    <header className="headerMainContainer">
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
              sx={{ cursor: "pointer" }}
              onClick={() => handleModalMenu("close")}
            ></Close>
          </div>
          {getLinkHTML}
        </article>
      </section>
      {/*   <ShoppingBasketIcon
        sx={{ margin: "10px", position: "absolute", right: "0" }}
      /> */}

      <section className="headerLinksConatiner">
        <article className="mainLinks">{getLinkHTML}</article>

        <article className="loggedInLinks">
          <div className="headerLinkContainer">
            <a href="" className="link">
              Schedule
            </a>
          </div>
        </article>
      </section>
    </header>
  );
};
