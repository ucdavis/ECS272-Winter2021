/*global google*/
import {GoogleMap,LoadScript, Marker} from "@react-google-maps/api";
import {withScriptjs} from "react-google-maps";
import key from "./api_key.json";
import React from 'react';
import {getData, getData_for_country,pack} from "./GetData.js";


const mapStyles = {
    height:"100%",
    width: "100%"
};



class Ggmap extends React.Component{
    constructor(props){
        super(props);
        // let url = new URL(window.location.href);
        // let iso = url.searchParams.get("iso");
        getData(()=>console.log("hi"));
        let max_confirm = d3.max(pack.CList,data=>data.total_case);
        let max_vaccination_rate = d3.max(pack.CList,data=>data.total_vac/data.population);
        let max_death_rate = d3.max(pack.CList,data=>data.total_deaths/data.total_case);
        let data_array = pack.CList;
        let size_scale = d3.scaleLinear()
                            .domain([d3.min(data_array,data=>data.total_case),d3.max(data_array,data=>data.total_case)])
                            .range([0,50])
        for(let i = 0; i<data_array;i++){
            if(data_array[i].total_deaths/data_array[i].total_case == max_vaccination_rate){
                data_array[i].url = "./death_emoji.png";
            }else if(data_array.total_vac/data.population == max_vaccination_rate){
                data_array[i].url = "./vaccination_emoji.png";
            }else{
                data_array[i].url = "./sick_emoji.png";
            }
            data_array[i].m_width = size_scale(data_array[i].total_case);
            data_array[i].m_height = size_scale(data_array[i].total_case);

        }
        
        this.state = {
            array:data_array,
            selected_index: 0,
            // selected_lat:38.546720,
            // selected_lng:-121.744340
          };
        this.handle_change = this.handle_change.bind(this);
        // this.handle_click = this.handle_click.bind(this);
        // console.log("google",window.google);

    }
    handle_click(data){
        window.location.replace("/Stat_view?iso="+data.name);
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
                        zoom = {2}
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
                                                url:data.url,
                                                scaledSize:{width: data.m_width, height: data.m_height, i: undefined, g: undefined}
                                        }}
                                        />
                            })
                        }
                    </GoogleMap>
                </LoadScript>
            <script src={"https://maps.googleapis.com/maps/api/js?key="+key["key"]+"&libraries=geometry"}></script>

            </div>
            <div className="controlPanel">
              <a className="home" href="/">Home</a>
              
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