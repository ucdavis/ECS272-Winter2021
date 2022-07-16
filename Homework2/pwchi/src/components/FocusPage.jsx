import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, LinearProgress } from "@material-ui/core";

import BarChart from "./BarChart";
import GlobalControlPanel from "./GlobalControlPanel";
import DonutsPanel from "./DonutsPanel";
import DonutControlPanel from "./DonutControlPanel";
import Map from "./Map";

import getGeocodePromise from "../uitls/getGeocodePromise";

const useStyles = makeStyles((theme) => ({
    progress: {},
    root: {
        flexGrow: 1,
        marginTop: "16px",
    },
    item: {
        display: "flex",
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: theme.palette.text.secondary,
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
}));

const FocusPage = (props) => {
    const { data, setData, visible } = props;
    const [xAxis, setXAxis] = useState({
        name: "x-axis",
        label: "Columns",
        value: "",
        options: [],
    });
    const [fineSelect, setFineSelect] = useState({
        name: "fine-select",
        label: "Rows",
        value: [],
        options: [],
        disabled: true,
    });
    const [topK, setTopK] = useState({
        name: "top-k",
        label: "Top K",
        value: 50,
        range: [1, 50],
        marks: [
            { value: 1, label: "1" },
            { value: 50, label: "50" },
        ],
        disabled: false,
    });
    const [yearSlider, setYearSlider] = useState({
        name: "year",
        label: "Year",
        value: [],
        range: [],
        marks: [],
    });
    const [donutsTarget, setDonutsTarget] = useState({
        name: "donuts-target-selector",
        label: "Target for Donuts",
        value: "",
        options: [],
        disabled: true,
    });
    const [donutsSelect, setDonutsSelect] = useState({
        name: "donuts-muti-selector",
        label: "Donut Topic",
        value: [],
        options: [],
        disabled: true,
        optionsDisable: [],
    });
    const [geoLoading, setGeoLoading] = useState(false);

    useEffect(() => {
        const years = [...new Set(data.map((ele) => ele["Release Year"]))].sort();
        const yearRange = [Math.min.apply(null, years), Math.max.apply(null, years)];
        const allXAxisName = Object.keys(data[0]).slice(0, -3);

        setXAxis((xAxis) => ({
            ...xAxis,
            options: allXAxisName,
        }));
        setYearSlider((yearSlider) => ({
            ...yearSlider,
            value: yearRange,
            range: yearRange,
            marks: years.map((d) => {
                return { value: d, label: null };
            }),
        }));
        setDonutsSelect((donutsSelect) => ({
            ...donutsSelect,
            options: allXAxisName,
            disabledOptions: allXAxisName.map((ele) => false),
        }));
    }, [data]);

    const handleXAxisChange = (event) => {
        const { value } = event.target;
        setXAxis((xAxis) => ({
            ...xAxis,
            value: value,
        }));

        // new X axis, new options for fine select
        const fineSelectOptions = getFineSelectOptions(value);
        setFineSelect((fineSelect) => ({
            ...fineSelect,
            value: [],
            options: value === "" ? [] : fineSelectOptions,
            disabled: value === "" ? true : false,
        }));
        setDonutsTarget((donutsTarget) => ({
            ...donutsTarget,
            value: "",
            options: value === "" ? [] : fineSelectOptions,
            disabled: value === "" ? true : false,
        }));

        const disabledOptions = donutsSelect.options.map((ele) => (ele === value ? true : false));
        disabledOptions[xAxis.options.indexOf(value)] = true;
        setDonutsSelect((donutsSelect) => ({
            ...donutsSelect,
            disabledOptions: disabledOptions,
        }));
    };
    const handleFineSelectChange = async (event) => {
        const { value } = event.target;

        // get Geocode if "Latitude" or "Longitude" of the selected data is null
        const newData = await updateGeocode(value);
        setData(newData);

        setFineSelect((fineSelect) => ({
            ...fineSelect,
            value: value,
        }));
        setDonutsTarget((donutsTarget) => ({
            ...donutsTarget,
            value: "",
            options: value.length === 0 ? fineSelect.options : value,
        }));
    };
    const handleTopKChange = (event, newValue) => {
        setTopK((topK) => ({
            ...topK,
            value: newValue,
        }));
    };
    const handleYearSliderChange = (event, newValue) => {
        setYearSlider((yearSlider) => ({
            ...yearSlider,
            value: newValue,
        }));
    };
    const handleDonutsTargetChange = (event) => {
        const { value } = event.target;
        setDonutsTarget((donutsTarget) => ({
            ...donutsTarget,
            value: value,
        }));

        setDonutsSelect((donutsSelect) => ({
            ...donutsSelect,
            disabled: value === "",
        }));
    };
    const handleDonutsSelectChange = (event) => {
        const { value } = event.target;
        setDonutsSelect((donutsSelect) => ({
            ...donutsSelect,
            value: value,
        }));
    };

    const getFineSelectOptions = (elementName) => {
        const selectedData = getDataInYearRange(yearSlider.value);
        let result = selectedData.map((ele) => {
            return ele[elementName];
        });

        // get unique options
        return [...new Set(result)].sort();
    };
    const getDataInYearRange = (range) => {
        return data.filter(
            (ele) => range[0] <= ele["Release Year"] && ele["Release Year"] <= range[1]
        );
    };
    const updateGeocode = async (fineSelectValue) => {
        setGeoLoading(true);
        const filteredData = data.filter(
            (ele) =>
                fineSelectValue.includes(ele[xAxis.value]) &&
                (ele.Longitude === null || ele.Latitude === null)
        );
        const promises = filteredData.map((ele, idx) => getGeocodePromise(ele.Locations, idx));

        return Promise.all(promises)
            .then((responses) => {
                return responses.map((response, idx) => {
                    const data = response.data;

                    return data.results.length !== 0
                        ? data.results[0].geometry.location
                        : { lat: undefined, lng: undefined };
                });
            })
            .then((locations) => {
                var newData = [...data];
                locations.forEach((location, idx) => {
                    try {
                        newData[filteredData[idx].id] = {
                            ...newData[filteredData[idx].id],
                            Latitude: location.lat,
                            Longitude: location.lng,
                        };
                    } catch (error) {
                        console.log(error);
                    }
                });

                setGeoLoading(false);

                return newData;
            })
            .catch((error) => {
                console.log(error);
                // no update
                return data;
            });
    };

    const classes = useStyles();

    return visible ? (
        <React.Fragment>
            {geoLoading ? (
                <LinearProgress className={classes.progress} />
            ) : (
                <LinearProgress variant="determinate" value={0} />
            )}
            <div className={classes.root} id="details-page">
                <Grid container spacing={2} alignItems="stretch">
                    <Grid className={classes.item} container item xs={2} direction="row">
                        <Paper className={classes.paper}>
                            <GlobalControlPanel
                                name="global-control-panel"
                                xAxis={{
                                    ...xAxis,
                                    onChange: handleXAxisChange,
                                }}
                                fineSelect={{
                                    ...fineSelect,
                                    onChange: handleFineSelectChange,
                                }}
                                topK={{
                                    ...topK,
                                    onChange: handleTopKChange,
                                }}
                                yearSlider={{
                                    ...yearSlider,
                                    onChange: handleYearSliderChange,
                                }}
                            />
                        </Paper>
                        <Paper className={classes.paper}>
                            <DonutControlPanel
                                name="donut-control-panel"
                                donutsTarget={{
                                    ...donutsTarget,
                                    onChange: handleDonutsTargetChange,
                                }}
                                donutsSelect={{
                                    ...donutsSelect,
                                    onChange: handleDonutsSelectChange,
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid className={classes.item} item xs={8}>
                        <Paper className={classes.paper}>
                            <BarChart
                                data={data}
                                xAxisName={xAxis.value}
                                fineSelect={fineSelect}
                                topK={topK.value}
                                yearRange={yearSlider.value}
                            />
                        </Paper>
                    </Grid>
                    <Grid className={classes.item} item xs={2}>
                        <Paper className={classes.paper}>
                            <DonutsPanel
                                data={data}
                                constraints={{
                                    xAxisName: xAxis.value,
                                    yearRange: yearSlider.value,
                                    target: donutsTarget.value,
                                    selections: donutsSelect.value,
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid className={classes.item} item xs={12}>
                        <Paper className={classes.paper} style={{ height: "500px" }}>
                            <Map
                                data={data}
                                constraints={{
                                    xAxisName: xAxis.value,
                                    fineSelectValue: fineSelect.value,
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    ) : null;
};

export default FocusPage;
