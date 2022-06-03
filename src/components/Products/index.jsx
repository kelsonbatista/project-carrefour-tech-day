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
  const [filteredData, setFilteredData] = useState([]);
  const { seller, filter, dispatchProducts } = props;
  const [isLoading, setIsLoading] = useState(true);

  console.log(seller, "<<<<<<<<< SELLER PROD");
  console.log(filter, "<<<<<<<<< SELLER PROD FILTER");

  const handleProducts = async () => {
    const { data } = await fetchProductsAPI(setIsLoading, seller);
    setProducts(() => data);
    setFilteredData(() => data);
    dispatchProducts(data);
  };

  const handleFilteredData = (filter) => {
    console.log(filter, "<<<<<<<<<< HANDLE FILTER");
    const filteredData = products.filter((product) =>
      product.items[0].nameComplete.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    console.log(seller, "<<<<<<<<<<<<<<< SELLER EFFECT");
    handleProducts();
  }, [seller]);

  useEffect(() => {
    console.log(filter, "<<<<<<<<<FILLLLL");
    handleFilteredData(filter);
  }, [filter]);

  useEffect(() => {
    console.log(filteredData, "<<<<<<<<<<<<<FILTERED");
  }, [filteredData]);

  return (
    <>
      {console.log(isLoading === true, "checkkkkkkkkkkkkk")}
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          <div className="products__all">
            {filteredData.map((product) => (
              <div key={product.productId} className="product__card">
                <div>
                  <Image
                    src={product.items[0].images[0].imageUrl}
                    alt={product.items[0].nameComplete}
                    className="product__image img-fluid shadow-4"
                  />
                </div>
                <div className="product__title">
                  {product.items[0].nameComplete}
                </div>
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
  filter: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  seller: state.seller,
  filter: state.products.filter,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchProducts: (products) => dispatch(setProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
