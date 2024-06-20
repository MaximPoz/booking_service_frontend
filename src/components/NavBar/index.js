import style from "./style.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const NavBar = ({ itemsList }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={style.container}>
      <div className={style.nav}>
        <Link to={"/"}>
          <img
            className={style.logo}
            src='/logo111.jpeg'
            alt="mFlogo"
          />
        </Link>

        <p className={style.nameSite}>the magic of fashion</p>

        <div className={style.hamburger} onClick={toggleMobileMenu}>
          ☰
        </div>

        <div className={`${style.menu} ${isMobileMenuOpen ? style.mobileMenuOpen : ''}`}>
          <ul>
            {itemsList.map((item, index) => (
              <li key={index}>
                <Link to={`/${item.url}`}>{item.nameNav}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
