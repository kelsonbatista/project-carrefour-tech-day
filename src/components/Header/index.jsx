import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsBoxSeam, BsHeart, BsSearch } from "react-icons/bs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import bannerTop from "../../assets/images/banner-top-1.png";
import logo from "../../assets/images/logo-carrefour-site.png";
import { setFilter } from "../../store/actions";
import CartButton from "../CartButton";
import "./styles.css";

const Header = (props) => {
  const { dispatchFilterProduct } = props;
  const [filterProduct, setFilterProduct] = useState("");

  const handleFilterProduct = (event) => {
    event.preventDefault();
    dispatchFilterProduct(filterProduct);
  };

  // useEffect(() => {
  //   dispatchFilterProduct(filterProduct);
  // }, [filterProduct]);

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
        <div className="header__group">
          <div className="header__logo">
            <div className="header__menu">
              <AiOutlineMenu
                className="header__menu-sm"
                size="30px"
                color="black"
              />
              <Link to="/">
                <img src={logo} alt="Carrefour" className="header__logo-img" />
              </Link>
            </div>
            <div className="header__icons-sm">
              <div>
                <BiUser size="30px" color="blue" />
              </div>
              <div>
                <BsBoxSeam size="30px" color="blue" />
              </div>
              <div>
                <BsHeart size="30px" color="blue" />
              </div>
              <div>
                <CartButton />
              </div>
            </div>
          </div>
          <div className="header__search">
            <Form className="header__form">
              <InputGroup className=" mb-3">
                <FormControl
                  type="text"
                  className="header__input form-control"
                  onChange={({ target }) => setFilterProduct(target.value)}
                  placeholder="Pesquise por produtos ou marcas"
                  aria-label="Pesquise por produtos ou marcas"
                  aria-describedby="basic-addon2"
                  value={filterProduct}
                />
                <Button
                  className="header__button btn btn-primary"
                  type="submit"
                  onClick={(event) => handleFilterProduct(event)}
                  id="basic-addon2"
                >
                  <BsSearch color="white" />
                </Button>
              </InputGroup>
            </Form>
          </div>
          <div className="header__icons">
            <div>
              <BiUser size="30px" color="blue" />
            </div>
            <div>
              <BsBoxSeam size="30px" color="blue" />
            </div>
            <div>
              <BsHeart size="30px" color="blue" />
            </div>
            <div>
              <CartButton />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

Header.propTypes = {
  dispatchFilterProduct: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchFilterProduct: (filter) => dispatch(setFilter(filter)),
});

export default connect(null, mapDispatchToProps)(Header);
