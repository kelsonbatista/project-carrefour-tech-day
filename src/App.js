import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./assets/styles/app.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import fetchGeolocationAPI from "./services/geolocationAPI";
import fetchSellersAPI from "./services/sellersAPI";
import { setLoading, setProductsSeller, setUser } from "./store/actions";

const App = (props) => {
  const { dispatchSeller, dispatchLoading, dispatchUser } = props;
  const [postalcode, setPostalCode] = useState(null);
  const [borough, setBorough] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seller, setSeller] = useState("");

  const handleLocation = async () => {
    console.log(isLoading, "<<<<<<<<<< IS LOADING [1][A]");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getCoordinates = async (position) => {
    const response = await fetchGeolocationAPI(
      position.coords.latitude,
      position.coords.longitude
    );
    const location = response.split(",");
    setBorough(location[1].split(" - ")[1]);
    setCity(location[2]);
    setPostalCode(() => location[3].trim());
    setCountry(location[4]);
    console.log(borough, "<<<<<<<<<< BOROUGH [1]");
  };

  const getUserData = async () => {
    if (postalcode !== null) {
      console.log(postalcode, "<<<<<<<<<< POSTAL CODE [1][B]");
      await handleSellers(setIsLoading, "BRA", postalcode);
    }
  };

  const handleSellers = async (setIsLoading, country, postalcode) => {
    const pc = await postalcode.replace("-", "");
    const getSellers = await fetchSellersAPI(setIsLoading, country, pc);
    console.log(getSellers, "<<<<<<<<<< GET SELLERS [1]");
    const nearstSeller = getSellers[0];
    const sellerName = nearstSeller.name;
    setSeller(sellerName);
    dispatchSeller(sellerName);
    dispatchLoading(isLoading);
  };

  function handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }

  useEffect(() => {
    handleLocation();
    console.log(typeof postalcode, postalcode, "<<<<<<<<<< POSTAL CODE [1][A]");
  }, []);

  useEffect(() => {
    getUserData();
    dispatchUser({ borough, city, postalcode, country });
  }, [postalcode]);

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

const mapDispatchToProps = (dispatch) => ({
  dispatchSeller: (seller) => dispatch(setProductsSeller(seller)),
  dispatchLoading: (loading) => dispatch(setLoading(loading)),
  dispatchUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
