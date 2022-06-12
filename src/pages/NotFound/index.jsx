import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";
import "./styles.css";

const NotFoundPage = (props) => {
  const isLoading = false;

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
              <div>{<NotFound />}</div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

NotFoundPage.propTypes = {
  list: PropTypes.object,
  isLoading: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  list: state.products.list,
  isLoading: state.loading,
});

export default connect(mapStateToProps, null)(NotFoundPage);
