import axios from "axios";

const fetchProductsAPI = async (setIsLoading, seller) => {
  console.log(seller, "<<<<<<<<<<<<<<< SELLER");
  const URL = `https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=${seller}`;
  setIsLoading(false);
  return await axios
    .get(URL)
    .then((res) => res)
    .catch((err) => `Error: ${err.message}`);
};

export default fetchProductsAPI;
