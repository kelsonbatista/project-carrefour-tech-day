import PropTypes from "prop-types";
import { BsCart2 } from "react-icons/bs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCartOpen } from "../../store/actions";
import "./styles.css";

const CartButton = (props) => {
  const { cartQty, dispatchCartOpen } = props;

  return (
    <div className="cart__btn-div">
      <Link
        to="#"
        className="cart__btn"
        data-testid="shopping-cart-button"
        onClick={() => dispatchCartOpen(true)}
      >
        <BsCart2 size="30px" color="blue" />
      </Link>
      {cartQty !== 0 && (
        <div className={cartQty ? "cart__btn-qty" : ""}>
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

const mapDispatchToProps = (dispatch) => ({
  dispatchCartOpen: (open) => dispatch(setCartOpen(open)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
