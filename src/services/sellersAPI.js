import axios from "axios";

const fetchSellerAPI = async (country, postalcode) => {
  const URL = `https://mercado.carrefour.com.br/api/checkout/pub/regions?country=${country}&postalCode=${postalcode}`;
  return await axios
    .get(URL)
    .then((res) => res.data[0].sellers)
    .catch((err) => `Error: ${err.message}`);
};

export default fetchSellerAPI;
