/*global google*/
import {GoogleMap,LoadScript, Marker} from "@react-google-maps/api";
import {withScriptjs} from "react-google-maps";
import key from "./api_key.json";
import React from 'react';


const mapStyles = {
    height:"100%",
    width: "100%"
};



class Ggmap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array:[
                {
                    population:2,
                    lat:38.546720,
                    lng:-121.744340,
                    name:"Sacramento"
                },
                {
                    population:102334403,
                    lat:27,
                    lng:30,
                    name:"Egypt"
                }
            ],
            selected_index: 0
            // selected_lat:38.546720,
            // selected_lng:-121.744340
          };
        this.handle_change = this.handle_change.bind(this);
        // this.handle_click = this.handle_click.bind(this);

    }
    handle_click(data){
        window.location.replace("/detail_view_1?country="+data.name);
    }

    handle_change(event){
        this.setState({
            selected_index:event.target.value
        });
        // console.log(this.state.selected_lat, this.state.selected_lng);
        // this.mapRef.panTo(new window.google.maps.LatLng(this.state.selected_lat, this.state.selected_lng));
      }

    render(){

        return (
            <div className="GMcontainer">
            <div className="map">
                <LoadScript googleMapsApiKey = {key["key"]}>
                    <GoogleMap
                        mapContainerStyle= {mapStyles}
                        center = {{
                            lat:this.state.array[this.state.selected_index].lat,
                            lng:this.state.array[this.state.selected_index].lng
                        }}
                        zoom = {8}
                        // ref={(ref) => {
                        //     this.mapRef = ref;
                        // }}
                    >
                        {
                            this.state.array.map((data,index)=>{
                                return <Marker 
                                            onClick={this.handle_click.bind(this,data)}
                                            position={{lat:data.lat,lng:data.lng}} 
                                            name={data.name}
                                            icon={{
                                                url:"https://www.clipartmax.com/png/middle/433-4338193_sick-temperature-iphoneemoji-emoji-transparent-background-wink-emoji.png",
                                            }}
                                        />
                            })
                        }
                    </GoogleMap>
                </LoadScript>
            <script src={"https://maps.googleapis.com/maps/api/js?key="+key["key"]+"&libraries=geometry"}></script>

            </div>
            <div className="controlPanel">
              <select onChange={this.handle_change}>
                {this.state.array.map(
                  (data,index)=>{
                    // console.log("current state",this.state.selected_lat, this.state.selected_lng)
                    return <option key={index} value={index}>{data["name"]}</option>
                  }
                )}
              </select>
              <div className="info_window">
                <h6> population:{this.state.array[this.state.selected_index].population}</h6>
                <h6> lat: {this.state.array[this.state.selected_index].lat} </h6>
                <h6> lng: {this.state.array[this.state.selected_index].lng} </h6>
              </div>

            </div>
          </div>
          
        
        )
    }
}



export default Ggmap;