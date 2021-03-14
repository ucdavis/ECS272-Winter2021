import React from 'react';
import "./ImageSKY.css";
import * as d3 from "d3";
import { index } from 'd3';
import demodata from "./datasets/demodata.json";

class ImageSKY extends React.Component{
  constructor(props){
    super(props);
    let url = new URL(window.location.href);
    let name = url.searchParams.get("country");
    if(name ==null||name == undefined){
      name = "United States";
    }
    let origin_data = demodata.data;
    let data = origin_data.filter(data=>data.name);
    for(let i=0; i< data.length;i++){
      data[i].real_date = String(new Date(data[i].date));
      let sum = data[i].new_cases+data[i].new_deaths+data[i].daily_vaccinated;
      data[i].death = 100*(data[i].new_deaths/sum);
      data[i].confirmation = 100*(data[i].new_cases/sum);
      data[i].vaccination = 100*(data[i].daily_vaccinated/sum);
    }
    this.state ={
      data:data,
      at:1,
      index_array:[]

    };
    this.handle_slider = this.handle_slider.bind(this);
    this.handle_click = this.handle_click.bind(this);

  }

  handle_slider(event){
    this.setState({
      at:event.target.value
    })
  }

  get_url_param(){
    let url = new URL(window.location.href);
    let start = url.searchParams.get("start");
    return {
        start: start
    };
  }

  componentDidMount(){
    this.draw_sk_tetris();
  }

  componentDidUpdate(){
    this.draw_sk_tetris();
  }

  handle_click(event, data){
      let index = this.state.data.indexOf(data);
      let temp_array = this.state.index_array.slice();
      console.log("before:",temp_array);

      if(temp_array.includes(index)){
       temp_array.splice(temp_array.indexOf(index),1);
      }else{
       temp_array.push(index);
      }

      if(temp_array.length>2){
        temp_array.splice(0,1);
       }

      console.log("after:",index,temp_array);
       this.setState({
         index_array:temp_array});
  }

  draw_sk_tetris(){
    d3.select(".SKY").selectAll("*").remove();
    let data = this.state.data.slice(0,this.state.at);
    let height = 100/data.length;
    const svg = d3.select(".SKY")
                .append("svg")
                .attr('width', "100%")
                .attr('height', "100%")
                .style("background","white");
    
    svg.selectAll("death") 
       .data(data)
       .enter()
       .append("rect")
       .style("fill",data=>{
        if(isNaN(data.death)){
          return "grey";
        }
        return "red";
       })
       .attr("x",0)
       .attr("y",(data,index)=>(100-(index+1)*height)+"%")
       .attr("width",data=>{
        if(isNaN(data.death)||data.death<0){
          // console.log(data);
          if(data.death<0){
            console.log(data);
          }
          return "100%";
        }

        return data.death+"%";})
       .attr("height",height+"%")
       .attr("stroke","black")
       .attr("stroke-width","0.3")
       .style("opacity",(data,index)=>{
        //  console.log("state",this.state.index_array.includes(index),index);
        if(this.state.index_array.includes(index)){
          return "0.5";
        }
        return "1";
      })
       .on("click",this.handle_click)
       .append("title")
       .text(data=>{
         return "date: "+data.real_date+"\n death case: "+data.new_deaths;
       });

    svg.selectAll("confirmation")
       .data(data)
       .enter()
       .append("rect")
       .style("fill","yellow")
       .attr("x",data=>{
        if(isNaN(data.death)){
          return "0%"
         }
         return data.death+"%";})
       .attr("y",(data,index)=>(100-(index+1)*height)+"%")
       .attr("width",data=>{ 
        if(isNaN(data.confirmation)||data.confirmation<0){
          if(data.confirmation<0){
            console.log(data);
          }
          return "0%";
        }
         return data.confirmation+"%";})
       .attr("height",height+"%")
       .attr("stroke","black")
       .attr("stroke-width","0.3")
       .style("opacity",(data,index)=>{
        if(this.state.index_array.includes(index)){
          return "0.5";
        }
        return "1";
      })
      .on("click",this.handle_click)
       .append("title")
       .text(data=>{
         return "date: "+data.real_date+"\n confirmation case: "+data.new_cases;
       });

    
    svg.selectAll("vaccination")
       .data(data)
       .enter()
       .append("rect")
       .style("fill","blue")
       .attr("x",data=>{
         if(isNaN(data.death)||isNaN(data.confirmation)){
          return "0%"
         }
         return data.death+data.confirmation+"%"})
       .attr("y",(data,index)=>(100-(index+1)*height)+"%")
       .attr("width",data=>{
        if(isNaN(data.vaccination)||data.vaccination<0){
          if(data.vaccination<0){
            console.log(data);
          }

          return "0%";
        } 
        return data.vaccination+"%";})
       .attr("height",height+"%")
       .attr("stroke","black")
       .attr("stroke-width","0.3")
       .style("opacity",(data,index)=>{
         if(this.state.index_array.includes(index)){
           return "0.5";
         }
         return "1";
       })
       .on("click",this.handle_click)
       .append("title")
       .text(data=>{
         return "date: "+data.real_date+"\n vaccination case: "+data.daily_vaccinated;
       });

  }

  // draw_ImageSky(){
  //   let emoji_url = "data:image/png;base64,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"
  //   let myData = [  
  //       { name:"Mafe", vaccination_count:36, day:1, img: emoji_url},  
  //       { name:"Santi", vaccination_count:9, day:2, img: emoji_url},
  //       { name:"David", vaccination_count:3, day:3, img: emoji_url}, 
  //       { name:"Sonia", vaccination_count:73, day:4, img: emoji_url},
  //       { name:"Vicente", vaccination_count:73, day:5, img: emoji_url},
  //     ];

  //   const svg = d3.select(".SKY")
  //               .append("svg")
  //               .attr('width', "100%")
  //               .attr('height', "100%")
  //               .style("background","white");

  //   let node = svg.selectAll("g.node")
  //                   .data(myData,(data)=>data.name);
  //   let g = node.enter()
  //               .append("g")
  //               .attr("class","node");
    
  //   let defs = g.append("defs");
    
  //   let x_scale = d3.scaleLinear()
  //                   .domain([d3.min(myData,data=>data.day),d3.max(myData,data=>data.day)])
  //                   .range([5,99]);
    
  //   let y_scale = d3.scaleLinear()
  //                   .domain([0, d3.sum(myData,data=>data.vaccination_count)])
  //                   .range([5,95]);
    
  //   let r_scale = d3.scaleLinear()
  //                   .domain([d3.min(myData,data=>data.vaccination_count), d3.sum(myData,data=>data.vaccination_count)*2])
  //                   .range([20,100]);

  //   svg.append("line")
  //       .attr("id",'y_axis')
  //       .style("stroke-width","2px")
  //       .style("stroke","black")
  //       .attr("x1","2%")
  //       .attr("y1","100%")
  //       .attr("x2","3%")
  //       .attr("y2","0%"); 


  //   svg.append("line")
  //       .attr("id",'x_axis')
  //       .style("stroke-width","2px")
  //       .style("stroke","black")
  //       .attr("x1","0%")
  //       .attr("y1","95%")
  //       .attr("x2","100%")
  //       .attr("y2","95%"); 
    
  //   svg.append("text")
  //       .attr("id","x_axis_title")
  //       .text("day")
  //       .attr("width",5)
  //       .attr("height",5)       
  //       .attr("x","50%")
  //       .attr("y","98%")
  //       .style("font-size","1.5em");

  //   svg.append("text")
  //       .attr("id","y_axis_title")
  //       .text("vaccination_count")
  //       .attr("width",5)
  //       .attr("height",5)       
  //       .attr("x","-25%")
  //       .attr("y","3%")
  //       .style("font-size","1.5em")
  //       .attr("transform","rotate(-90)");


  //   let track_x = "2%", track_y="95%";



  //   defs.append('pattern')
  //       .attr("id",(data)=>data.name)
  //       .attr("width",1)
  //       .attr("height",1)
  //       .append("image")
  //       .attr("xlink:href",data=>data.img)
  //       .attr("width",data=>r_scale(data.vaccination_count)*2)
  //       .attr("height",data=>r_scale(data.vaccination_count)*2);
    
  //   let text = svg.append("text")
  //       .attr("id","vaccination_console")
  //       .text("Total Vaccinated: 0")
  //       .attr("width",5)
  //       .attr("height",5)       
  //       .attr("x","5%")
  //       .attr("y","5%")
  //       .style("font-size","2em");

    
  //   g.append("circle")
  //     .attr("class","customized_circles")
  //     .attr("cx",data=>x_scale(data.day)+"%")
  //     .attr("cy",data=>(95 - y_scale(data.vaccination_count))+"%")
  //     .attr("fill",data=>"url(#"+data.name+")")
  //     .attr("r", data=>r_scale(data.vaccination_count))
  //     .transition()
  //     .delay(data=>data.day*1000)
  //     .duration(2000)
  //     .attr("cx",data=>x_scale(data.day)+"%")
  //     .attr("cy",(data,idx)=>{

  //       let result = (95 - y_scale(d3.sum(myData,(data,index)=>{
  //         if(index<=idx){
  //           return data.vaccination_count;
  //         }
  //       })))+"%";
  //       return result;
  //     })
  //     .on("end",(data,idx)=>{
  //       // svg.append("line")
  //       //     .style("stroke-width","1px")
  //       //     .style("stroke","black")
  //       //     .attr("x1",x_scale(data.day)+"%")
  //       //     .attr("y1",y_scale(data.vaccination_count)+"%")
  //       //     .attr("x2","0%")
  //       //     .attr("y2","0%");
  //       let result = (95 - y_scale(d3.sum(myData,(data,index)=>{
  //         if(index<=idx){
  //           return data.vaccination_count;
  //         }
  //       })))+"%";

  //       svg.append("line")
  //       .style("stroke-width","2px")
  //       .style("stroke","black")
  //       .attr("x1",x_scale(data.day)+"%")
  //       .attr("y1",result)
  //       .attr("x2",track_x)
  //       .attr("y2",track_y); 
  //       track_x = x_scale(data.day)+"%";
  //       track_y = result;
        
  //       svg.append("circle")
  //           .attr("fill","orange")
  //           .attr("r",5)      
  //           .attr("cx",x_scale(data.day)+"%")
  //           .attr("cy",(95 - y_scale(data.vaccination_count))+"%")
  //           .append('title')
  //           .text("day:"+data.day+"\n"+"vaccination_count:"+data.vaccination_count+"\n"+"percentage_of_daily_vaccinatedcination:"+((data.vaccination_count/d3.sum(myData,data=>data.vaccination_count)*100)).toFixed(3));

  //       console = d3.select("#vaccination_console");
  //       let console_text_arr = console.text().split(":");
  //       console.text(console_text_arr[0]+":"+(Number(console_text_arr[1])+data.vaccination_count));

  //     })
  //     .delay(data=>data.day*200)
  //     .remove();

      
    
  // }

  render(){
    let start = this.get_url_param()["start"];
    if(start == "Geo"){
        return (
          <div className="GeoSKYPageLayout">
          <h1 className="header">Customized Design View: Tetris Sky</h1>
          <div className="SKYcontainer">
          <input type="range" min="1" max={this.state.data.length}  value={this.state.at} onChange={this.handle_slider} />
            <div className="SKY">
    
            </div>
            
            <div className="controlPanel">
              <div className="info_window">
                  <h6>From date: {this.state.data[0].real_date}</h6>
                  <h6>To date: {this.state.data[this.state.at-1].real_date}</h6>
                  <h6>Total confirmation case:{d3.sum(this.state.data.slice(0,this.state.at),data=>data.new_cases)}</h6>
                  <h6>Total death case:{d3.sum(this.state.data.slice(0,this.state.at),data=>data.new_deaths)}</h6>
                  <h6>Total vaccination case:{d3.sum(this.state.data.slice(0,this.state.at),data=>data.total_vaccinated)}</h6>
                </div>
                <div className="info_window">
                  <h6>Compare from date: {this.state.index_array[0]!=null?this.state.data[this.state.index_array[0]].real_date:"N/A"}</h6>
                  <h6>Compare to date:  {this.state.index_array[1]!=null?this.state.data[this.state.index_array[1]].real_date:"N/A"}</h6>
                  <h6>Daily confirmation case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].new_cases-this.state.data[this.state.index_array[0]].new_cases:"N/A"}</h6>
                  <h6>Daily death case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].new_deaths-this.state.data[this.state.index_array[0]].new_deaths:"N/A"}</h6>
                  <h6>Daily vaccination case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].daily_vaccinated-this.state.data[this.state.index_array[0]].daily_vaccinated:"N/A"}</h6>
                  <h6>Total confirmation case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].total_case-this.state.data[this.state.index_array[0]].total_case:"N/A"}</h6>
                  <h6>Total death case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].total_deaths-this.state.data[this.state.index_array[0]].total_deaths:"N/A"}</h6>
                  <h6>Total vaccination case status: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].total_vaccinated-this.state.data[this.state.index_array[0]].total_vaccinated:"N/A"}</h6>
                </div>
                <div className="info_window">
                  <h6>death proportion:</h6>
                  <div className="death_proportion"></div>
                  <h6>confirmation proportion:</h6>
                  <div className="confirmation_proportion"></div>
                  <h6>vaccination proportion:</h6>
                  <div className="vaccination_proportion"></div>
                  <h6>Zero confirm, zero vaccination, zero death:</h6>
                  <div className="zero_proportion"></div>
                </div>
                <a className="home" href={"/Stat_view?start=Geo&country="+this.state.data[0].name}>Next</a>
            </div>

          </div>
        </div>

            );
    }else{
        return (
            <div className="PCSKYPageLayout">
              <h1 className="header">Customized Design View: Tetris Sky</h1>
              <div className="SKYcontainer">
              <input type="range" min="1" max={this.state.data.length}  value={this.state.at} onChange={this.handle_slider} />
                <div className="SKY">
        
                </div>
                <div className="controlPanel">
                  <div className="info_window">
                      <h6>From date: {this.state.data[0].real_date}</h6>
                      <h6>To date: {this.state.data[this.state.at-1].real_date}</h6>
                      <h6>Total confirmation case:{d3.sum(this.state.data.slice(0,this.state.at),data=>data.new_cases)}</h6>
                      <h6>Total death case:{d3.sum(this.state.data.slice(0,this.state.at),data=>data.new_deaths)}</h6>
                      <h6>Total vaccination case:{d3.sum(this.state.data.slice(0,this.state.at),data=>data.total_vaccinated)}</h6>
                    </div>
                    <div className="info_window">
                      <h6>Compare from date: {this.state.index_array[0]!=null?this.state.data[this.state.index_array[0]].real_date:"N/A"}</h6>
                      <h6>Compare to date:  {this.state.index_array[1]!=null?this.state.data[this.state.index_array[1]].real_date:"N/A"}</h6>
                      <h6>Daily confirmation case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].new_cases-this.state.data[this.state.index_array[0]].new_cases:"N/A"}</h6>
                      <h6>Daily death case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].new_deaths-this.state.data[this.state.index_array[0]].new_deaths:"N/A"}</h6>
                      <h6>Daily vaccination case status: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].daily_vaccinated-this.state.data[this.state.index_array[0]].daily_vaccinated:"N/A"}</h6>
                      <h6>Total confirmation case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].total_case-this.state.data[this.state.index_array[0]].total_case:"N/A"}</h6>
                      <h6>Total death case comparison: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].total_deaths-this.state.data[this.state.index_array[0]].total_deaths:"N/A"}</h6>
                      <h6>Total vaccination case status: {this.state.index_array.length==2?this.state.data[this.state.index_array[1]].total_vaccinated-this.state.data[this.state.index_array[0]].total_vaccinated:"N/A"}</h6>
                    </div>
                    <div className="info_window">
                      <h6>death proportion:</h6>
                      <div className="death_proportion"></div>
                      <h6>confirmation proportion:</h6>
                      <div className="confirmation_proportion"></div>
                      <h6>vaccination proportion:</h6>
                      <div className="vaccination_proportion"></div>
                      <h6>Zero confirm, zero vaccination, zero death:</h6>
                      <div className="zero_proportion"></div>
                    </div>
                    <a className="home" href={"/Stat_view?start=Parall&country="+this.state.data[0].name}>Next</a>
                </div>

              </div>
            </div>
            );        
    }


  }

}

export default ImageSKY;