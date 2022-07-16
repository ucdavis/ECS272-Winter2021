import axios from "axios";

const getGeocodePromise = async (address, idx = 0) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 250 * idx); // avoid overaccess (no more 5 requests in 1 sec)
    });

    return await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
            address: address,
            key: "AIzaSyALnnQIgYfZ4UyhBXfRUtTwmbnfoqBcTxA",
        },
    });
};
export default getGeocodePromise;
