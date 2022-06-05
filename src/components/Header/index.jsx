import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsBoxSeam, BsCart2, BsHeart, BsSearch } from "react-icons/bs";
import { connect } from "react-redux";
import bannerTop from "../../assets/images/banner-top-1.png";
import logo from "../../assets/images/logo-carrefour-site.png";
import { setFilter } from "../../store/actions";
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
          <BiUser size="30px" color="blue" />
          <BsBoxSeam size="30px" color="blue" />
          <BsHeart size="30px" color="blue" />
          <BsCart2 size="30px" color="blue" />
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
