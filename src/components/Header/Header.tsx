import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles.css";

const Header = () => {
  const location = useLocation();

  const links = [
    { name: "main", title: "main", href: "/" },
    { name: "form old", title: "form old", href: "form-old" },
    { name: "form new", title: "form new", href: "form-new" },
  ];

  const getCurrentRoute = () => {
    let route = location.pathname.replace("/", "");
    if (!route) route = "/";
    return route;
  };

  const getRouteTitle = () => {
    const currentLink = links.filter((link) => link.href === getCurrentRoute());
    return currentLink[0].title;
  };

  return (
    <header className="header">
      <nav className="container">
        <ul className="header__container">
          <h1 className="page__title">{getRouteTitle()}</h1>
          {links.map((link, key) => (
            <li key={key}>
              <NavLink
                to={link.href}
                className={(status) =>
                  "header__link" +
                  (status.isActive ? " header__link--active" : "")
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
