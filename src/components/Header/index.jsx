import { AiOutlineMenu } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsBoxSeam, BsCart2, BsHeart } from "react-icons/bs";
import { GrSearch } from "react-icons/gr";
import bannerTop from "../../assets/images/banner-top-1.png";
import logo from "../../assets/images/logo-carrefour-site.png";
import "./styles.css";

const Header = () => {
  return (
    <header>
      <section className="header__banner">
        <img
          src={bannerTop}
          alt="Banner Promo"
          className="header__banner-top"
        />
      </section>
      <section className="header">
        <div className="header__logo">
          <div className="header__menu">
            <AiOutlineMenu
              className="header__menu-sm"
              size="30px"
              color="black"
            />
            <img src={logo} alt="Carrefour" className="header__logo-img" />
          </div>
          <div className="header__icons-sm">
            <BiUser size="30px" color="blue" />
            <BsBoxSeam size="30px" color="blue" />
            <BsHeart size="30px" color="blue" />
            <BsCart2 size="30px" color="blue" />
          </div>
        </div>
        <div className="header__search input mb-3">
          <input
            type="text"
            className="header__input form-control"
            placeholder="Pesquise por produtos ou marcas"
            aria-label="Pesquise por produtos ou marcas"
          />
          <button className="header__button btn btn-primary">
            <GrSearch color="white" />
          </button>
        </div>
        <div className="header__icons">
          <BiUser size="30px" color="blue" />
          <BsBoxSeam size="30px" color="blue" />
          <BsHeart size="30px" color="blue" />
          <BsCart2 size="30px" color="blue" />
        </div>
      </section>
    </header>
  );
};

export default Header;
