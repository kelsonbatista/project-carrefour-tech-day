import PropTypes from "prop-types";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const AddToCartButton = (props) => {
  const { hasProducts, itemQty, index, handleQuantity, handleAddToCart } =
    props;

  return (
    <>
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
    </>
  );
};

AddToCartButton.propTypes = {
  hasProducts: PropTypes.bool,
  itemQty: PropTypes.number,
  index: PropTypes.number,
  handleQuantity: PropTypes.func,
  handleAddToCart: PropTypes.func,
}.isRequired;

export default AddToCartButton;
