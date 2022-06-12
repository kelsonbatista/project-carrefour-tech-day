import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
import fetchProductsAPI from "../../services/productsAPI";
import { setProducts } from "../../store/actions";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import ProductsCarousel from "../ProductsCarousel";
import "./styles.css";

const Products = (props) => {
  const [products, setProductsState] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [quantity, setQuantity] = useState(0);
  // const [cart, setCart] = useState([]);
  const { seller, filter, newPostalCode, dispatchProducts } = props;
  const [isLoading, setIsLoading] = useState(true);
  // const history = useHistory();

  const handleProducts = async () => {
    const { data } = await fetchProductsAPI(setIsLoading, seller);
    await data.sort(() => Math.random() - 0.5);
    setProductsState(() => data);
    setFilteredData(() => data);
    dispatchProducts(data);
  };

  const handleFilteredData = (filter) => {
    const filteredData = products.filter((product) =>
      product.items[0].nameComplete.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    handleProducts();
  }, [seller, newPostalCode]);

  useEffect(() => {
    handleFilteredData(filter);
  }, [filter]);

  return (
    <>
      <ProductsCarousel />
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          <div className="products__all">
            {filteredData.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
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
  newPostalCode: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  seller: state.seller,
  filter: state.products.filter,
  newPostalCode: state.user.newPostalCode,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchProducts: (products) => dispatch(setProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
