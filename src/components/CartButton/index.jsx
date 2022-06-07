import PropTypes from "prop-types";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./styles.css";

const CartButton = (props) => {
  const { cartItemsQty } = props;
  const updateCart = () => {
    const cart = localStorage["carrefour-cart"]
      ? JSON.parse(localStorage["carrefour-cart"])
      : [];
    if (cart.length > 0) {
      const qtyItems = cart.reduce((acc, item) => acc + item.qty, 0);
      return qtyItems || qtyItems + cartItemsQty;
    }
  };

  return (
    <div className="cart__btn-div">
      <Link to="/cart" className="cart__btn" data-testid="shopping-cart-button">
        <BsCart2 size="30px" color="blue" />
      </Link>
      <div className="cart__btn-qty">
        <p data-testid="shopping-cart-size">{updateCart()}</p>
      </div>
    </div>
  );
};

CartButton.propTypes = {
  cartItemsQty: PropTypes.number,
}.isRequired;

export default CartButton;
