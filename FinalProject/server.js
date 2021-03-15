const { raw } = require('body-parser');
const { table } = require('console');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

var xlsx2json = require('xlsx2json');

var survey_data = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

app.get('/data', (req, res) => {
    res.json(survey_data);
});

const RateToNum = (rate) => {
    if(rate.includes('Strongly agree')) {
        return 5;
    } else if(rate.includes('Agree')) {
        return 4;
    } else if(rate.includes('Neither agree nor disagree')) {
        return 3;
    } else if(rate.includes('Disagree')) {
        return 2;
    } else if(rate.includes('Strongly disagree')) {
        return 1;
    } else {
        return 0;
    }
};

const YearToNum = (year) => {
    if(year.includes('First')) {
        return 1;
    } else if(year.includes('Sophomore')) {
        return 2;
    } else if(year.includes('Junior')) {
        return 3;
    } else if(year.includes('Senior')) {
        return 4;
    } else {
        return 0;
    }
};

const ProcessGender = (gender) => {
    if(gender.includes('Male')) {
        return('Male');
    } else if(gender.includes('Female')) {
        return('Female');
    } else {
        return('Other');
    }
}

const ProcessMajor = (major) => {
    if(major.toLowerCase().includes('design')) {
        return('Design')
    } else {
        return('NonDesign')
    }
}

xlsx2json('dataset.xlsx').then(jsonArray => {
    raw_data = []
    table_json = jsonArray[0];
    
    for(let i=1; i<table_json.length; i++) {
        line = table_json[i];
        // console.log(line);
        line.O = RateToNum(line.O);
        line.P = RateToNum(line.P);
        line.Q = RateToNum(line.Q);
        line.G = ProcessGender(line.G);
        line.K = ProcessMajor(line.K);

        if(line.A == 1) {
            line.L = YearToNum(line.L);
            raw_data.push({id:line.E, gender:line.G, race:line.H, income:line.J, major:line.K, tool:line.M, tool_text:line.N, year:line.L, sat:[line.O,0,0], eff:[line.P,0,0], sig:[line.Q,0,0], com:[line.R,0,0]});
        } else if(line.A == 2 || line.A == 3) {
            for(let j=0; j<raw_data.length; j++) {
                if(raw_data[j].id == line.E) {
                    raw_data[j].sat[parseInt(line.A) - 1] = line.O;
                    raw_data[j].eff[parseInt(line.A) - 1] = line.P;
                    raw_data[j].sig[parseInt(line.A) - 1] = line.Q;
                    raw_data[j].com[parseInt(line.A) - 1] = line.R;
                }
            }
        }
    }
    
    // console.log(raw_data);


    for(let i=0; i<raw_data.length; i++) {
        isValid = true;
        for(let j=0; j<3; j++) {
            if(raw_data[i].sat[j] == 0) {
                isValid = false;
            }
        }
        
        for(let j=0; j<3; j++) {
            if(raw_data[i].eff[j] == 0) {
                isValid = false;
            }
        }

        for(let j=0; j<3; j++) {
            if(raw_data[i].sig[j] == 0) {
                isValid = false;
            }
        }

        if(raw_data[i].year == 0) {
            isValid = false;
        }

        if(isValid) {
            survey_data.push(raw_data[i]);
        }
    }
    
    console.log(`${survey_data.length}/${raw_data.length} students data available.`)
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})