import axios from "axios";

const fetchGeolocationAPI = async (latitude, longitude) => {
  const API_KEY = "AIzaSyAAHuPzqHI3OFaW6RMdjq2WOu1aVV-7NSw";
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${API_KEY}`;
  return await axios
    .get(URL)
    .then((res) => res.data.results[0].formatted_address)
    .catch((err) => `Error: ${err.message}`);
};

export default fetchGeolocationAPI;
