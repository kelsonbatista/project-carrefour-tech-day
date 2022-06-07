import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, Image, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { setCart } from "../../store/actions";
import "./styles.css";

const ProductCard = (props) => {
  const { product, index, dispatchCart } = props;
  const [itemQty, setItemQty] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [update, setUpdate] = useState(false);
  const [hasProducts, setHasProducts] = useState(false);

  const productData = {
    id: product.items[0].itemId,
    title: product.items[0].nameComplete,
    price: product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount,
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
    });
    setItemQty((prev) => prev + 1);
    setSubTotal((prev) => prev + Number(productData.price.toFixed(2)));
    localStorage.setItem("carrefour-cart", JSON.stringify(newCart));
    newCart.length > 0 ? setHasProducts(true) : setHasProducts(false);
  };

  const handleQuantity = ({ target }) => {
    setUpdate(true);
    const action = target.getAttribute("data-id");
    if (action === "increase") {
      setItemQty((prev) => prev + 1);
      setSubTotal((prev) => prev + Number(productData.price.toFixed(2)));
    } else {
      setItemQty((prev) => prev - 1);
      setSubTotal((prev) => prev - Number(productData.price.toFixed(2)));
    }
  };

  const updateCart = () => {
    const cart = localStorage["carrefour-cart"]
      ? JSON.parse(localStorage["carrefour-cart"])
      : [];
    const itemIndex =
      cart && cart.findIndex((item) => item.id === productData.id);
    console.log(itemIndex, "<<<<INDEX");
    if (cart.length > 0 && update) {
      cart[itemIndex].price = subTotal;
      cart[itemIndex].qty = itemQty;
      dispatchCart({ subTotal, itemQty });
    } else {
      setHasProducts(false);
    }
    localStorage.setItem("carrefour-cart", JSON.stringify(cart));
    setUpdate(false);
    itemIndex >= 0 ? setHasProducts(true) : setHasProducts(false);
  };

  useEffect(() => {
    updateCart();
  }, [subTotal, itemQty]);

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
});

export default connect(null, mapDispatchToProps)(ProductCard);
