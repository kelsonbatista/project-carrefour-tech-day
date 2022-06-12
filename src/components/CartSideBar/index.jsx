import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setCartOpen } from "../../store/actions";
import "./styles.css";

const CartSideBar = (props) => {
  const [products, setProducts] = useState([]);
  const { qtyTotal, total, cartOpen, dispatchCartOpen } = props;

  const getCart = () => {
    const cart = localStorage["carrefour-cart"]
      ? JSON.parse(localStorage["carrefour-cart"])
      : [];
    if (cart.length > 0) {
      setProducts(cart);
    }
  };

  useEffect(() => {
    if (qtyTotal <= 0) setProducts([]);
    getCart();
  }, [qtyTotal]);

  return (
    <div className={`cartsidebar ${cartOpen && "active"}`}>
      <div className="cartsidebar__top">{`Carrinho (${qtyTotal})`}</div>
      <div className="cartsidebar__items">
        {qtyTotal <= 0 ? (
          <div className="cartsidebar__empty">Seu carrinho está vazio.</div>
        ) : (
          products &&
          products.map((product) => (
            <div key={product.id} className="cartsidebar__item">
              <div className="cartsidebar__image">
                <Image src={product.url} alt={product.title} />
              </div>
              <div className="cartsidebar__title">{product.title}</div>
              <div className="cartsidebar__qty">{product.qty}</div>
              <div className="cartsidebar__price">{`R$ ${product.price}`}</div>
            </div>
          ))
        )}
      </div>
      <div className="cartsidebar__bottom">
        <div className="cartsidebar__summary">
          <div className="cartsidebar__qty-total">{`Subtotal (${qtyTotal} produtos)`}</div>
          <div className="cartsidebar__total">{`R$ ${total}`}</div>
        </div>
        <div className="cartsidebar__checkout">
          <Button
            className="cartsidebar__checkout-btn btn btn-success"
            type="button"
            onClick={() => {}}
            id="basic-addon2"
          >
            {"Finalizar compra"}
          </Button>
        </div>
      </div>
      <div className="cartsidebar__close">
        <Link
          to="#"
          className="cart__btn"
          data-testid="shopping-cart-button"
          onClick={() => dispatchCartOpen(false)}
        >
          <AiOutlineClose size="30px" />
        </Link>
      </div>
    </div>
  );
};

CartSideBar.propTypes = {
  qtyTotal: PropTypes.number,
  total: PropTypes.number,
  cartOpen: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  qtyTotal: state.products.cartTotal.qty,
  total: state.products.cartTotal.total,
  cartOpen: state.products.cartOpen,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCartOpen: (close) => dispatch(setCartOpen(close)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartSideBar);
