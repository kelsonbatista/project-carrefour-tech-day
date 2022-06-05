import PropTypes from "prop-types";
import { AiOutlineDownCircle } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { connect } from "react-redux";
import Loading from "../Loading";

const NavBar = (props) => {
  const { seller, city } = props;

  return (
    <>
      <div className="products__navbar">
        <div className="products__navbar-items">
          <ul>
            <li>Todos departamentos</li>
            <li>Ofertas do dia</li>
            <li>Mundo Gamer</li>
            <li>Smartphones</li>
            <li>Pneus & Auto</li>
            <li>Xiaomi</li>
            <li>Notebooks</li>
            <li>Eletrodomésticos</li>
          </ul>
        </div>
      </div>
      {typeof seller !== "object" ? (
        <div className="products__seller">
          <div className="products__seller-info">
            <div className="products__user">
              <div>
                <IoLocationOutline size="20px" />
              </div>
              <div>{`Ofertas para: ${city}${seller}`}</div>
              <div>
                <AiOutlineDownCircle className="products__newCep" size="20px" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

NavBar.propTypes = {
  city: PropTypes.string,
  seller: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  city: state.user.city,
  seller: state.seller,
});

export default connect(mapStateToProps, null)(NavBar);
