import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
    return `${value}`;
}

export default function TopKSlider({
    name,
    label,
    value,
    range,
    marks,
    disabled,
    onChange,
    ...rest
}) {
    const useStyles = makeStyles((theme) => ({
        topK: {
            margin: theme.spacing(1),
            // width: "90%",
        },
        label: {
            fontSize: 14,
        },
    }));
    const classes = useStyles();

    return (
        <div key={name} className={classes.topK}>
            <Typography className={classes.label} id={`${name}-discrete-slider`} gutterBottom>
                {label}
            </Typography>
            <Slider
                defaultValue={value}
                value={value}
                getAriaValueText={valuetext}
                aria-labelledby={`${name}-discrete-slider`}
                valueLabelDisplay="auto"
                marks={marks}
                step={1}
                // step={range[1] - range[0]}
                min={range[0]}
                max={range[1]}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    );
}
