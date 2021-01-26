import React from 'react';
import { Layout } from 'antd';
import BarChart from './BarChart';
import ParallelView from './ParallelView'
// import data from  './datasets/SF_Historical_Ballot_Measures.csv';
import data from './datasets/data.csv';
import data_by_year from './datasets/data_by_year.csv';
import data_w_genres from  './datasets/data_w_genres.csv';
import data_by_artist from  './datasets/data_by_artist.csv';
import iris_data from './datasets/iris.csv';
import './App.css';
import YearView from './YearView';
import PopularityView from './PopularityView';
import YearDetailView from './YearDetailView';
import RadarView from './RadarView';
import Top10SongView from './Top10SongView';
import Top10ArtistView from './Top10ArtistView';
import { timeThursdays } from 'd3';

const { Sider, Content, Footer } = Layout;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: data,
      data_by_year: data_by_year,
      data_w_genres: data_w_genres,
      data_by_artist: data_by_artist,
      iris_data: iris_data,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      maxWidth: 1500,
      keys: ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "valence"],
      colors: ['#ed0345','#377eb8','#4daf4a','#984ea3','#ff7f00','#022c7d','#a65628','#1a1334', '#aa88cc', '#22bb88'],
      change_year: (year)=>{
        this.state.top_10_song.changeYear(year);
        this.state.top_10_artist.changeYear(year);
      },
      change_selected: (index)=>{
        console.log(index);
        this.state.top_10_song.changeSelected(index);
        this.state.top_10_artist.changeSelected(index);
      },
      set_top_10_song: (ref)=>{this.state.top_10_song = ref;},
      set_top_10_artist: (ref)=>{this.state.top_10_artist = ref;},
      id: "chart-1"
    }
  }

  componentDidMount() {
    var handleResize = () => {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight);
      this.setState({ innerWidth: window.innerWidth });
      console.log(this.state.innerWidth);
      this.forceUpdate();
      this.render();
    }
  
    window.addEventListener('resize', handleResize)
  }

  render(){
    return (
      // <div className="App">
      //   <h2>ECS 272 Assignment 3 D3 Template</h2>
      //   <div id="container"> 
      //   <div id="tooltip"></div>
      //   </div>
      //   <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
      // </div>
      
      <div id="app">
        <header>
          <h1>Spotify Music Audio Features Dataset 1921-2020</h1>
        </header>
        <div id="pad"></div>
        <div id="display">
          <div id="left-view">
            <YearView id="year-view" change_year={this.state.change_year} size={{width: "850", height:"400", margin:{left:50, right:40, top:20, bottom:40}}} data={this.state.data} data_by_year={this.state.data_by_year} keys={this.state.keys} colors={this.state.colors}></YearView>
            <YearDetailView id="year-detail-view" change_selected={this.state.change_selected} size={{width: "850", height:"200", margin:{left:50, right:40, top:20, bottom:40}}} data={this.state.data} data_by_year={this.state.data_by_year} keys={this.state.keys} colors={this.state.colors}></YearDetailView>
          </div>
          <div id="right-view">
            <Top10SongView id="top-10-song-view" set_top_10_song={this.state.set_top_10_song} size={{width:"400", height:"300", margin:{left:80, right:40, top:40, bottom:100}}} data={this.state.data} data_by_year={this.state.data_by_year} keys={this.state.keys} colors={this.state.colors}></Top10SongView>
            <Top10ArtistView id="top-10-artist-view" set_top_10_artist={this.state.set_top_10_artist} size={{width:"400", height:"300", margin:{left:80, right:40, top:40, bottom:100}}} data={this.state.data} data_by_artist={this.state.data_by_artist} keys={this.state.keys} colors={this.state.colors}></Top10ArtistView>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
