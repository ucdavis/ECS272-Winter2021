import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Selector = ({ name, label, value, options, onChange, disabled = false, ...rest }) => {
    const useStyles = makeStyles((theme) => ({
        xAxis: {
            width: "90%",
        },
        formControl: {
            margin: theme.spacing(1),
            width: "100%",
            maxWidth: `${window.innerWidth / 6 - 64}px`,
        },
        label: {
            fontSize: 19,
        },
        select: {
            "& .MuiSelect-select": {
                marginTop: theme.spacing(2),
            },
            "& .MuiSelect-icon": {
                marginTop: theme.spacing(1),
            },
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.xAxis}>
            <FormControl className={classes.formControl}>
                <InputLabel shrink className={classes.label} id={`${name}-label`}>
                    {label}
                </InputLabel>
                <Select
                    className={classes.select}
                    labelId={`${name}-label`}
                    id={`${name}-placeholder-label`}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    displayEmpty
                    autoWidth
                >
                    <MenuItem value="">
                        <em>(No Value)</em>
                    </MenuItem>
                    {options.map((ele) => (
                        <MenuItem key={ele} value={ele}>
                            {ele}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default Selector;
