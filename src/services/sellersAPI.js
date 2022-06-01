import axios from "axios";

const fetchSellerAPI = async (setIsLoading, country, postalcode) => {
  const URL = `https://mercado.carrefour.com.br/api/checkout/pub/regions?country=${country}&postalCode=${postalcode}`;
  setIsLoading(false);
  return await axios
    .get(URL)
    .then((res) => res.data[0].sellers)
    .catch((err) => `Error: ${err.message}`);
};

export default fetchSellerAPI;
