import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { BsCartFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { connect } from "react-redux";
import "./styles.css";

const ProductDetails = (props) => {
  const { list, productId } = props;
  console.log(props.list, "<<<<<<<<<<<PROPSSSSS 1");
  const [product, setProduct] = useState([]);

  const handleProduct = (list) => {
    console.log("entrouuuuuuuuuuuuu");
    const productItem = list.filter(
      (product) => product.items[0].itemId === productId
    );
    console.log(productItem, "<<<<<<<<<<<<PROD");
    setProduct(productItem);
  };

  const handleAddToCart = () => {};

  useEffect(() => {
    console.log("check 1 <<<<<<<<<<<");
    handleProduct(list);
  }, []);

  return (
    <>
      {product[0] && (
        <>
          <div className="details__breadcrumb">
            <IoHome size="22px" color="gray" />
            {console.log(
              product[0].categories[0],
              "<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>"
            )}
            {product[0].categories[0].split("/").join(" > ")}
          </div>
          <div className="details__item">
            <div className="details__images">
              <Image
                src={product[0].items[0].images[0].imageUrl}
                alt={product[0].items[0].nameComplete}
                className="details__thumb img-fluid shadow-4"
              />
            </div>
            <div className="details__group">
              <div className="details__info">
                <ul>
                  <li>{product[0].items[0].name}</li>
                  <li>Marca: {product[0].brand}</li>
                  <li>
                    R$ {product[0].items[0].sellers[0].commertialOffer.Price}
                  </li>
                </ul>
              </div>
              <div className="details__purchase">
                <Button
                  className="details__button"
                  variant="primary"
                  type="submit"
                  onClick={(event) => handleAddToCart(event)}
                  id="details-button"
                >
                  <div className="details__button-text">
                    <div className="details__button-icon">
                      <BsCartFill size="25px" color="white" />
                    </div>
                    <div>ADICIONAR AO CARRINHO</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

ProductDetails.propTypes = {
  list: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  list: state.products.list,
});

export default connect(mapStateToProps, null)(ProductDetails);
