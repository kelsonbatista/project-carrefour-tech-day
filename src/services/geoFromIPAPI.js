import axios from "axios";

const fetchGeoFromIP = async (setIsLoading) => {
  const TOKEN = "ab9573fc48719d";
  const URL = `https://ipinfo.io?token=${TOKEN}`;
  // setIsLoading(false);
  return await axios
    .get(URL)
    .then((result) => result.data)
    .catch((err) => `Error: ${err.message}`);
};

export default fetchGeoFromIP;
