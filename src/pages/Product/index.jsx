import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import ProductDetails from "../../components/ProductDetails";

const Product = (props) => {
  const isLoading = false;
  const { productId } = useParams();

  return (
    <>
      <Header />
      <main>
        <section className="details">
          {isLoading === true ? (
            <Loading />
          ) : (
            <>
              <div>{<NavBar />}</div>
              <div>{<ProductDetails productId={productId} />}</div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

Product.propTypes = {
  list: PropTypes.object,
  isLoading: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  list: state.products.list,
  isLoading: state.loading,
});

export default connect(mapStateToProps, null)(Product);
