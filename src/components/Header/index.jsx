import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
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
  const [height, setHeight] = useState(0);
  const [scrolltop, setScrolltop] = useState(0);
  const [resize, setResize] = useState(0);
  const [margin, setMargin] = useState(0);
  const refHeaderBanner = useRef();
  const refHeader = useRef();

  const handleFilterProduct = (event) => {
    event.preventDefault();
    dispatchFilterProduct(filterProduct);
  };

  const handleScroll = (event) => {
    const scrollTop = window.scrollY;
    setScrolltop(scrollTop);
  };

  const handleResize = (event) => {
    const newWidth = window.innerWidth;
    setResize(newWidth);
  };

  useEffect(() => {
    const heightBanner = refHeaderBanner.current.clientHeight;
    setHeight(heightBanner);
    const height = refHeader.current.clientHeight;
    const heightTotal = 200 + heightBanner + height;
    setMargin(heightTotal);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const height = refHeaderBanner.current.clientHeight;
    setHeight(height);
  }, [resize]);

  useEffect(
    (prevProps, prevState) => {
      const scrollTop2 = window.pageYOffset;
      if (scrollTop2 !== ((prevState) => prevState.scrolltop)) {
        setScrolltop(scrollTop2);
      }
    },
    [scrolltop]
  );

  // useEffect(() => {
  //   dispatchFilterProduct(filterProduct);
  // }, [filterProduct]);

  return (
    <header>
      {console.log(margin, "marginnnnn")}
      <section
        className={
          scrolltop > height
            ? "header__banner header__banner-sticky"
            : "header__banner"
        }
        styles="margin-bottom: 350px"
        ref={refHeaderBanner}
      >
        <img
          src={bannerTop}
          alt="Banner Promo"
          className="header__banner-top"
        />
      </section>
      {console.log(scrolltop, height, "KKKKKKKKKKKKKKKKKKKKK")}
      <section
        className={scrolltop > height ? "header stickee" : "header"}
        ref={refHeader}
      >
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
