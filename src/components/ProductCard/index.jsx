import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, Image, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { setCart, setCartTotal } from "../../store/actions";
import "./styles.css";

const ProductCard = (props) => {
  const { product, index, dispatchCart, dispatchCartTotal } = props;
  const [itemQty, setItemQty] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [getItemQty, setGetItemQty] = useState(0);
  const [update, setUpdate] = useState(false);
  const [hasProducts, setHasProducts] = useState(false);

  useEffect(() => {
    console.log(subTotal, itemQty, "############### UPDATE ################");
    updateCart();
    getCart();
    handleZero();
  }, [subTotal, itemQty]);

  const productData = {
    id: product.items[0].itemId,
    title: product.items[0].nameComplete,
    price: product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount,
    url: product.items[0].images[0].imageUrl,
  };

  const handleAddToCart = () => {
    setUpdate(true);
    const newCart = localStorage["carrefour-cart"]
      ? JSON.parse(localStorage["carrefour-cart"])
      : [];
    newCart.push({
      id: productData.id,
      title: productData.title,
      price: productData.price.toFixed(2),
      qty: 1,
      url: productData.url,
    });
    const price = Number(
      (Math.round(Number(productData.price) * 100) / 100).toFixed(2)
    );
    setItemQty((prev) => Number(prev) + 1);
    setSubTotal((prev) => Number(prev) + price);
    localStorage.setItem("carrefour-cart", JSON.stringify(newCart));
    newCart.length > 0 ? setHasProducts(true) : setHasProducts(false);
  };

  const handleQuantity = ({ target }) => {
    setUpdate(true);
    const action = target.getAttribute("data-id");
    const price = Number(
      (Math.round(Number(productData.price) * 100) / 100).toFixed(2)
    );
    if (action === "increase") {
      setItemQty((prev) => prev + 1);
      setSubTotal((prev) => prev + price);
    } else {
      setItemQty((prev) => prev - 1);
      setSubTotal((prev) => prev - price);
    }
  };

  const updateCart = () => {
    const cart = localStorage["carrefour-cart"]
      ? JSON.parse(localStorage["carrefour-cart"])
      : [];
    const itemIndex =
      cart && cart.findIndex((item) => item.id === productData.id);
    if (cart.length > 0 && update) {
      cart[itemIndex].price = Number(subTotal.toFixed(2));
      cart[itemIndex].qty = Number(itemQty);
      dispatchCart({ subTotal, itemQty });
    } else if (itemIndex >= 0) {
      const qty = cart[itemIndex].qty !== undefined && cart[itemIndex].qty;
      setItemQty(qty);
      setGetItemQty(qty);
      setHasProducts(false);
    }
    localStorage.setItem("carrefour-cart", JSON.stringify(cart));
    itemIndex >= 0 ? setHasProducts(true) : setHasProducts(false);
    setUpdate(false);
  };

  const handleZero = () => {
    if (itemQty === 0 && hasProducts) {
      getCart();
      console.log(itemQty, "ZEROOOOOOO<<<<<<<<<<<<<<<<<<<<");
      const cart = JSON.parse(localStorage.getItem("carrefour-cart"));
      const newCart = cart.filter((item) => item.id !== productData.id);
      console.log(newCart, productData.id, "ZEROOOOOOO<<<<CARTTT<<<<<<<<<<");
      localStorage.setItem("carrefour-cart", JSON.stringify(newCart));
      setHasProducts(false);
    }
  };

  const getCart = () => {
    const cart = localStorage["carrefour-cart"]
      ? JSON.parse(localStorage["carrefour-cart"])
      : [];
    if (cart.length > 0) {
      console.log(cart, "<<<<<<<<<<<<<<<<<<< CART");
      const total =
        cart &&
        cart.reduce((acc, item) => {
          return acc + Number(item.price);
        }, 0);
      const newTotal = Number(total.toFixed(2));
      const qty =
        cart &&
        cart.reduce((acc, item) => {
          return acc + item.qty;
        }, 0);
      console.log(total, qty, "<<<<<<<<<<<<<<<< GET CART");
      dispatchCartTotal({ total: newTotal, qty });
    } else {
      const total = 0;
      const qty = 0;
      dispatchCartTotal({ total, qty });
    }
  };

  return (
    <div key={product.productId} className="product__card">
      <div>
        <button
          key={index}
          type="button"
          className="product__button"
          onClick={() => history.push(`/product/${product.items[0].itemId}`)}
        >
          <Image
            src={product.items[0].images[0].imageUrl}
            alt={product.items[0].nameComplete}
            className="product__image img-fluid shadow-4"
          />
        </button>
      </div>
      <div className="product__title">
        {product.items[0].nameComplete.substring(0, 50).concat("...")}
      </div>
      <div className="product__price">
        <div>
          {`R$ ${product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount.toFixed(
            2
          )}`}
        </div>
      </div>
      <div className="test">{`getitem ${getItemQty}`}</div>
      {!hasProducts && (
        <div className="product__add-div">
          <button
            key={index}
            type="button"
            className="product__add-btn btn btn-primary"
            onClick={() => handleAddToCart()}
          >
            ADICIONAR
          </button>
        </div>
      )}
      <div className="product__qty">
        <Form className="product__qty-form">
          <InputGroup className=" mb-3">
            {hasProducts && (
              <>
                <Button
                  className="product__qty-btn-m btn btn-primary"
                  type="button"
                  data-id="decrease"
                  onClick={(event) => handleQuantity(event)}
                  id="basic-addon2"
                >
                  -
                </Button>
                <FormControl
                  type="text"
                  className="product__qty-input form-control"
                  placeholder="Pesquise por produtos ou marcas"
                  aria-label="Pesquise por produtos ou marcas"
                  aria-describedby="basic-addon2"
                  value={itemQty}
                  disabled
                />
                <Button
                  className="product__qty-btn-p btn btn-primary"
                  type="button"
                  data-id="increase"
                  onClick={(event) => handleQuantity(event)}
                  id="basic-addon2"
                >
                  +
                </Button>
              </>
            )}
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.array,
  index: PropTypes.number,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchCart: (cart) => dispatch(setCart(cart)),
  dispatchCartTotal: (total) => dispatch(setCartTotal(total)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
