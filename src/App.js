import { useEffect, useState } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import fetchGeolocationAPI from "./services/geolocationAPI";
import fetchSellersAPI from "./services/sellersAPI";

const App = () => {
  const [sellers, setSellers] = useState([]);
  const [postalcode, setPostalCode] = useState(null);
  const [borough, setBorough] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    setSellers(getSellers);
  };

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
    console.log(typeof postalcode, postalcode, "<<<<<<<<<<<<<<<<PCODE");
  }, []);

  useEffect(() => {
    getUserData();
  }, [postalcode]);

  return (
    <>
      <Header />
      <main>
        {isLoading === true ? (
          <Loading />
        ) : (
          <ul>
            <li>{`Bairro: ${borough}`}</li>
            <li>{`Cidade: ${city}`}</li>
            <li>{`CEP: ${postalcode}`}</li>
            <li>{`País: ${country}`}</li>
          </ul>
        )}
        <ul>
          {sellers.map((seller) => (
            <li key={seller.id}>{seller.name}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default App;
