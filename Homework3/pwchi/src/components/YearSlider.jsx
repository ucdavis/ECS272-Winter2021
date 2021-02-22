import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
    return "";
}

export default function YearSlider({ name, label, value, range, marks, onChange, ...rest }) {
    const useStyles = makeStyles((theme) => ({
        yearSlider: {
            margin: theme.spacing(1),
        },
        label: {
            fontSize: 14,
        },
    }));
    const classes = useStyles();

    return (
        <div key={name} className={classes.yearSlider}>
            <Typography className={classes.label} id={`${name}-range-slider`} gutterBottom>
                {label}
            </Typography>
            <Slider
                defaultValue={value}
                value={value}
                marks={marks}
                step={null}
                min={range[0]}
                max={range[1]}
                onChange={onChange}
                valueLabelDisplay="auto"
                aria-labelledby={`${name}-range-slider`}
                getAriaValueText={valuetext}
            />
        </div>
    );
}
