import axios from "axios";

const fetchGeoFromCEP = async (setIsLoading, CEP) => {
  const URL = `https://viacep.com.br/ws/${CEP}/json/`;
  setIsLoading(false);
  return await axios
    .get(URL)
    .then((result) => result.data)
    .catch((err) => `Error: ${err.message}`);
};

export default fetchGeoFromCEP;
