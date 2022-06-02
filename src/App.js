import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiOutlineDownCircle } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { connect } from "react-redux";
import "./assets/styles/app.css";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Products from "./components/Products";
import fetchGeolocationAPI from "./services/geolocationAPI";
import fetchSellersAPI from "./services/sellersAPI";
import { setLoading, setProductsSeller, setUser } from "./store/actions";

const App = (props) => {
  const { dispatchSeller, dispatchLoading, dispatchUser } = props;
  const [seller, setSeller] = useState(null);
  const [postalcode, setPostalCode] = useState(null);
  const [borough, setBorough] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLocation = async () => {
    console.log(isLoading, "isloadinggggggggggggggggg");
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
    console.log(borough, "<<<<<<<<<<BOROUGH");
  };

  const getUserData = async () => {
    if (postalcode !== null) {
      console.log(postalcode, "<<<<<<<<POSTAL");
      await handleSellers(setIsLoading, "BRA", postalcode);
    }
  };

  const handleSellers = async (setIsLoading, country, postalcode) => {
    const pc = await postalcode.replace("-", "");
    const getSellers = await fetchSellersAPI(setIsLoading, country, pc);
    console.log(getSellers, "<<<<<<<<<<< GET SELLERS");
    const nearstSeller = getSellers[0];
    const sellerName = nearstSeller.name;
    setSeller(() => sellerName);
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
    console.log(typeof postalcode, postalcode, "<<<<<<<<<<<<<<<<POSTAL CODE");
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
              <div className="products__navbar">
                <div className="products__navbar-items">
                  <ul>
                    <li>Todos departamentos</li>
                    <li>Ofertas do dia</li>
                    <li>Mundo Gamer</li>
                    <li>Smartphones</li>
                    <li>Pneus & Auto</li>
                    <li>Xiaomi</li>
                    <li>Notebooks</li>
                    <li>Eletrodomésticos</li>
                  </ul>
                </div>
              </div>
              <div className="products__seller">
                <div className="products__seller-info">
                  <div className="products__user">
                    <div>
                      <IoLocationOutline size="20px" />
                    </div>
                    <div>{`Ofertas para: ${city}`}</div>
                    <div>
                      <AiOutlineDownCircle
                        className="products__newCep"
                        size="20px"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="products__store">Loja: {seller}</span>
                    <button className="products__button">Trocar loja</button>
                  </div>
                </div>
              </div>
              <div>{<Products />}</div>
              {console.log(isLoading, "IS LOADING")}
            </>
          )}
        </section>
      </main>
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
