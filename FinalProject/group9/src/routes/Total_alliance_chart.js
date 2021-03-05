import React, {Component} from 'react';
import ccodes from  '../datasets/COW country codes.csv';
import mil from  '../datasets/Military_expenditure.csv';
import allyDB from '../datasets/alliance_v4.1_by_member.csv';
import * as d3 from "d3";
import Total_alliance from './Total_alliance';

class Total_alliance_chart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      // load ccodes data
      d3.csv(ccodes)
      .then(csv => {
        var codemap_dup = csv.map(row => {
          return {
            name: String(row['StateNme']),
            code: String(row['CCode'])
          }
          })
        
        // remove duplicate codes
        var codemap = codemap_dup.reduce((unique, o) => {
          if(!unique.some(obj => obj.name === o.name && obj.code === o.code)) {
            unique.push(o);
          }
          return unique;
        },[]);

        // load military expenditure dataset
        d3.csv(mil)
        .then(csv => {             
          // create data by selecting two columns from csv 
          var entire_mil_exp = csv.map(row => {
            return {
              name: String(row['Name']),
              mil: Number(row['2018'])
            }
          })

          // load alliance dataset
          d3.csv(allyDB)
          .then(csv =>{
            // select meaningful columns
            var allianceDB_raw = csv.map(row => {
              return {
                allyID: Number(row['version4id']),
                ccode: Number(row['ccode']),
                styear: Number(row['all_st_year']),
                type: String(row['ss_type']),
                endyear: Number(row['all_end_year'])
              }
            });

            function filter_effective(array) {
              var effectives = array.filter(alliance => alliance.endyear == "")
              var mutual_defense = effectives.filter(alliance => alliance.type == "Type I: Defense Pact" || alliance.type == "Type III: Entente")
              return mutual_defense;
              }
            
            // filter still effective and about mutual defense alliances
            var allianceDB_dup = filter_effective(allianceDB_raw);

            // remove duplicate data
            var allianceDB = allianceDB_dup.reduce((unique, o) => {
              if(!unique.some(obj => obj.allyID === o.allyID && obj.ccode === o.ccode)) {
                unique.push(o);
              }
              return unique;
            },[]);

            console.log(allianceDB)

            // get list of alliances
            var allianceList = new Set()
            


            var set_of_alliances = {
              name: "Global Cooperations",
              children: []
            }

            console.log(allianceDB);
          })
        })
      })
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Total_alliance_chart;