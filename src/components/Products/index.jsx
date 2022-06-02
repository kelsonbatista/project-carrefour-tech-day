import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { connect } from "react-redux";
import fetchProductsAPI from "../../services/productsAPI";
import { setProducts } from "../../store/actions";
import Loading from "../Loading";
import "./styles.css";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const { seller, dispatchProducts } = props;
  const [isLoading, setIsLoading] = useState(true);

  console.log(seller, "<<<<<<<<< SELLER PROD");

  const handleProducts = async () => {
    const getProducts = await fetchProductsAPI(setIsLoading, seller);
    setProducts(() => getProducts.data);
    dispatchProducts(getProducts.data);
  };

  useEffect(() => {
    console.log(seller, "<<<<<<<<<<<<<<< SELLER EFFECT");
    handleProducts();
  }, [seller]);

  return (
    <>
      {console.log(isLoading === true, "checkkkkkkkkkkkkk")}
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          <div className="products__all">
            {products.map((product) => (
              <div key={product.productId} className="product__card">
                <div>
                  <Image
                    src={product.items[0].images[0].imageUrl}
                    alt={product.items[0].nameComplete}
                    className="product__image img-fluid shadow-4"
                  />
                </div>
                <div>{product.items[0].nameComplete}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

Products.propTypes = {
  seller: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  seller: state.seller,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchProducts: (products) => dispatch(setProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
