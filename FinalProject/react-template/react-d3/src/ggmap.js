import {GoogleMap,LoadScript, withScriptjs, withGoogleMap} from "react-google-maps";
import key from "./api_key";


const MapContainer = ()=>{
    const mapStyles = {
        height:"100%",
        width: "100%"
    };

    const defaultCenter = {
    lat:38.546720,
    lng:-121.744340
    };

    return <LoadScript
        googleMapsApiKey = {key["key"]}
        zoom = {10}
        center = {defaultCenter}
        mapContainerStyle = {mapStyles}
    ></LoadScript>
}


export default MapContainer;