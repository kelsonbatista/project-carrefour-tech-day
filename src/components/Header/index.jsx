import {
  faBox,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/logo-carrefour-site.png";
import "./styles.css";

const Header = () => {
  return (
    <header>
      <section className="header">
        <div className="header__logo">
          <img src={logo} alt="Carrefour" className="header__logo-img" />
        </div>
        <div className="header__search input mb-3">
          <input
            type="text"
            className="header__input form-control"
            placeholder="Pesquise por produtos ou marcas"
            aria-label="Pesquise por produtos ou marcas"
          />
          <button className="header__button btn btn-primary">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="header__icons">
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faBox} />
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </section>
    </header>
  );
};

export default Header;
