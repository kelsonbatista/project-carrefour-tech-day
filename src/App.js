import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./assets/styles/app.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import fetchGeoFromCEP from "./services/geoFromCEPAPI";
import fetchGeoFromIP from "./services/geoFromIPAPI";
import fetchSellersAPI from "./services/sellersAPI";
import { setLoading, setProductsSeller, setUser } from "./store/actions";

const App = (props) => {
  const { dispatchSeller, dispatchLoading, dispatchUser, newPostalCode } =
    props;
  const [isLoading, setIsLoading] = useState(true);
  const [seller, setSeller] = useState("");
  const [postalcode, setPostalCode] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);

  const handleLocationFromIP = async () => {
    const data = await fetchGeoFromIP(setIsLoading);
    setPostalCode(data.postal);
    setCity(data.city);
    setState(data.region);
    setCountry(data.country);
    console.log(data, "<<<<<<<<<<<<<<< DATA");
  };

  const handleLocationFromCEP = async () => {
    const data = await fetchGeoFromCEP(setIsLoading, newPostalCode);
    setPostalCode(data.cep);
    setCity(data.localidade);
    setState(data.uf);
    setCountry("Brasil");
    console.log(data, "<<<<<<<<<<<<<<< DATA CEP");
  };

  const getUserData = async (userPostalCode) => {
    if (userPostalCode !== null) {
      console.log(userPostalCode, "<<<<<<<<<< POSTAL CODE [1][B]");
      await handleSellers(setIsLoading, "BRA", userPostalCode);
    }
  };

  const handleSellers = async (setIsLoading, country, postalcode) => {
    const pc = await postalcode.replace("-", "");
    const getSellers = await fetchSellersAPI(setIsLoading, country, pc);
    console.log(getSellers, "<<<<<<<<<< GET SELLERS [1]");
    const nearestSeller = getSellers[0];
    const sellerName = nearestSeller.name;
    setSeller(sellerName);
    dispatchSeller(sellerName);
    dispatchLoading(isLoading);
  };

  useEffect(() => {
    handleLocationFromIP();
    console.log(typeof postalcode, postalcode, "<<<<<<<<<< POSTAL CODE [1][A]");
  }, []);

  useEffect(() => {
    getUserData(postalcode);
    dispatchUser({ postalcode, newPostalCode, city, state, country });
  }, [postalcode]);

  useEffect(() => {
    if (newPostalCode) {
      handleLocationFromCEP(setIsLoading, newPostalCode.split("-").join(""));
      getUserData(newPostalCode);
      dispatchUser({ postalcode, newPostalCode, city, state, country });
    }
    console.log(newPostalCode, "NEWWWWWWWWWWW");
  }, [newPostalCode]);

  return (
    <>
      <Header />
      <main>
        <section className="products">
          {isLoading === true ? (
            <Loading />
          ) : (
            <>
              <div>{<NavBar />}</div>
              <div>{seller && <Products />}</div>
              {console.log(isLoading, "<<<<<<<<<< IS LOADING [1][B]")}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

App.propTypes = {
  dispatchSeller: PropTypes.func,
  dispatchLoading: PropTypes.func,
  dispatchUser: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  newPostalCode: state.user.newPostalCode,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSeller: (seller) => dispatch(setProductsSeller(seller)),
  dispatchLoading: (loading) => dispatch(setLoading(loading)),
  dispatchUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
