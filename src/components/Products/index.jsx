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
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [quantity, setQuantity] = useState(0);
  // const [cart, setCart] = useState([]);
  const { seller, filter, newPostalCode, dispatchProducts } = props;
  console.log(props, "<<<<<< PROPSSSSSSSSSSSSSSSSSSSSSSSS");
  const [isLoading, setIsLoading] = useState(true);
  // const history = useHistory();

  console.log(seller, "<<<<<<<<<< SELLER PROD [2]");
  console.log(filter, "<<<<<<<<<< SELLER PROD FILTER [2]");

  const handleProducts = async () => {
    const { data } = await fetchProductsAPI(setIsLoading, seller);
    await data.sort(() => Math.random() - 0.5);
    console.log(await data, "<<<<<<<<<< SHUFFLE [2]");
    setProducts(() => data);
    setFilteredData(() => data);
    dispatchProducts(data);
  };

  const handleFilteredData = (filter) => {
    console.log(filter, "<<<<<<<<<< HANDLE FILTER [2]");
    const filteredData = products.filter((product) =>
      product.items[0].nameComplete.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    console.log(seller, "<<<<<<<<<< SELLER USEEFFECT [2]");
    handleProducts();
  }, [seller, newPostalCode]);

  useEffect(() => {
    console.log(filter, "<<<<<<<<<< FILTER [2]");
    handleFilteredData(filter);
  }, [filter]);

  return (
    <>
      <ProductsCarousel />
      {console.log(isLoading === true, "<<<<<<<<<< IS LOADING [2]")}
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
