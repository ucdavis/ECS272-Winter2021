import React from 'react';
import BarChart4 from './BarChart4';
import BarChart3 from './BarChart3';
import BarChart2 from './BarChart2';
import data from './datasets/owid-covid-data.csv';
import data2 from './datasets/country_vaccinations.csv';
import data3 from './datasets/countries_codes_and_coordinates.csv';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            data2: data2,
            data3: data3,
            id: "chart-1"
        }
    }

    /**
     * Homework 3
     * Yinwen Lu
     * 2021/2/13
     * Code may contain segment from template or online references
     */
    render() {

        return (
            <div className="App">
                <h2>Global Terro-activities data visualization</h2>
                <i>Due to large amount of data, slight lag may appear, please operate after all views are loaded</i>

                <div>
                    <div className="container1c">
                        <div id="tooltip" opacity="0.5"></div>
                    </div>

                    <div className="container2c">


                    </div>
                </div>
                <div padding-top="50px">
                    <div id="container1b">
                        <BarChart2 data={this.state.data}  data2={this.state.data2} data3={this.state.data3} width={this.state.width} height={this.state.height}/>





                    </div>

                </div>
                <div>
                    <div className="container1c">
                        <p>Select scatter line to display:</p><select id="selectButton"></select>
                    </div>

                    <div className="container2c">
                        <div id="tooltip3" opacity="0.5"></div>
                        <button type="button" id="reset">Reset</button>
                        <div id = "testsub">
                            <strong>Select number of terro-groups to display:</strong>

                            <div>
                                <button type="button" id="button1">Top5</button>
                                <button type="button" id="button2">Top10</button>
                                <button type="button" id="button3">Top15</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }

}

export default App;
