import logo from "../../assets/images/logo-carrefour-site.png";
import "./styles.css";

const Header = () => {
  return (
    <header>
      <section className="header">
        <div>
          <img src={logo} alt="Carrefour" className="header__logo" />
        </div>
        <div className="header__search input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </button>
        </div>
        <div className="header__icons">Icons</div>
      </section>
    </header>
  );
};

export default Header;
