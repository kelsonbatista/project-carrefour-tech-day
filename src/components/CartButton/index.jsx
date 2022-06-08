import PropTypes from "prop-types";
import { BsCart2 } from "react-icons/bs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";

const CartButton = (props) => {
  const { cartQty } = props;

  return (
    <div className="cart__btn-div">
      <Link to="/" className="cart__btn" data-testid="shopping-cart-button">
        <BsCart2 size="30px" color="blue" />
      </Link>
      {cartQty && cartQty !== "0" && (
        <div className="cart__btn-qty">
          <p data-testid="shopping-cart-size">{cartQty}</p>
        </div>
      )}
    </div>
  );
};

CartButton.propTypes = {
  cartQty: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  cartQty: state.products.cartTotal.qty,
});

export default connect(mapStateToProps, null)(CartButton);
