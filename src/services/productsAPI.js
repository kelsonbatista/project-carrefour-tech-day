import axios from "axios";

const fetchProductsAPI = async (setIsLoading, seller) => {
  const URL = `https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=${seller}`;
  const getProducts = await axios
    .get(URL)
    .then((res) => res)
    .catch((err) => `Error: ${err.message}`);
  await setIsLoading(false);
  return getProducts;
};

export default fetchProductsAPI;
