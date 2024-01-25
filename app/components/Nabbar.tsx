import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import "~/styles/util/nabbar.css";
import { MenuItem, MenuItems, NavButtons } from "~/types/index";
const HIDDEN_NAV = "hidden-nav";
const SHOWN_NAV = "shown-nav";

const LiElement = ({
  menuItem,
  toggleNav,
}: {
  menuItem: MenuItem;
  toggleNav: (arg: boolean | null) => void;
}) => {
  if (menuItem.href) {
    return (
      <li key={menuItem.href} className="nav-menu-item">
        <Link
          onClick={() => toggleNav(false)}
          className="nav-menu-link"
          to={menuItem.href}
        >
          <span>{menuItem.title}</span>
        </Link>
      </li>
    );
  } else if (menuItem.onClick) {
    return (
      <li key={menuItem.href} className="nav-menu-item">
        <span className="nav-menu-link" onClick={menuItem.onClick}>
          <span>{menuItem.title}</span>
        </span>
      </li>
    );
  } else return <></>;
};

export default function Nabbar({
  menuItems,
  buttons,
  homeLink = "/",
}: {
  menuItems: MenuItems;
  buttons: NavButtons;
  homeLink?: string;
}) {
  const [navElementClass, setNavElementClass] = useState(HIDDEN_NAV);
  const burgerRef = useRef<HTMLParagraphElement>(null);
  const sideNavRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    /* Closes the side nav when users click outside */
    if (!event || !event.target) {
      return;
    }

    if (!(burgerRef.current && sideNavRef.current)) {
      return;
    }

    let clickedBurger = burgerRef.current.contains(event.target as Node);
    let clickedSideNav = sideNavRef.current.contains(event.target as Node);

    if (!clickedSideNav && !clickedBurger) {
      setNavElementClass(HIDDEN_NAV);
    }
  };

  const toggleNav: (forceState: boolean | null) => void = (
    forceState = null
  ) => {
    /* Move the side nav bar on and off the page on small screens */
    let nextNavElementClass;

    if (window.innerWidth > 768) {
      nextNavElementClass = HIDDEN_NAV;
    } else if (
      navElementClass === HIDDEN_NAV ||
      (forceState !== null && forceState === true)
    ) {
      nextNavElementClass = SHOWN_NAV;
    } else {
      nextNavElementClass = HIDDEN_NAV;
    }

    setNavElementClass(nextNavElementClass);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav">
      {/* Top nav bar with title and hamburger menu */}
      <div className={"top-bar " + navElementClass + "-top-bar"}>
        {/* Nav bar title */}
        <a className="nav-links--logo" aria-label="home link" href={homeLink}>
          <img alt="" src="/images/logo.png" />
        </a>

        {/* Hamburger menu */}
        <p
          id="hamburger"
          className={navElementClass + "-burger"}
          ref={burgerRef}
          onClick={(e) => toggleNav(null)}
        >
          <span className="top-bun"></span>
          <span className="meat"></span>
          <span className="bottom-bun"></span>
          <span className="clickable-link"></span>
        </p>
      </div>

      {/* Nav Menu (menu items listed in NabbarMenu component) */}
      <div id="nav-menu-container" className={navElementClass} ref={sideNavRef}>
        <ul id="nav-menu">
          {(menuItems || []).map((menuItem) => (
            <LiElement
              key={menuItem.href}
              menuItem={menuItem}
              toggleNav={(e) => toggleNav(null)}
            />
          ))}
        </ul>
        <div className="nav-menu-actions">{buttons}</div>
      </div>

      {/* Background Clicker (see Nav.css for details) */}
      <div
        onClick={() => toggleNav(false)}
        id={"nav-background-clicker-" + navElementClass}
      ></div>
    </div>
  );
}
