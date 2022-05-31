import { useEffect, useState } from "react";
import Header from "./components/Header";
import fetchSellersAPI from "./services/sellersAPI";

const App = () => {
  const [sellers, setSellers] = useState([]);

  const handleSellers = async (country, postalcode) => {
    const getSellers = await fetchSellersAPI(country, postalcode);
    console.log(getSellers);
    setSellers(getSellers);
  };

  useEffect(() => {
    handleSellers("BRA", "12243000");
  }, []);

  return (
    <>
      <Header />
      <main>
        {sellers.map((seller) => (
          <li key={seller.id}>{seller.name}</li>
        ))}
      </main>
    </>
  );
};

export default App;
