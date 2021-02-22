import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function MultipleSelector({
    name,
    label,
    value,
    options,
    disabled,
    onChange,
    ...rest
}) {
    const useStyles = makeStyles((theme) => ({
        fineSelect: {
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
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: rest.width,
            },
        },
    };

    const classes = useStyles();

    return (
        <div className={classes.fineSelect}>
            <FormControl className={classes.formControl}>
                <InputLabel shrink className={classes.label} id={`${name}-multiple-chip-label`}>
                    {label}
                </InputLabel>
                <Select
                    className={classes.select}
                    labelId={`${name}-multiple-chip-label`}
                    id={`${name}-multiple-chip`}
                    value={value}
                    input={<Input />}
                    disabled={disabled}
                    onChange={onChange}
                    displayEmpty
                    multiple
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    autoWidth
                >
                    {options.map((ele, idx) => (
                        <MenuItem
                            key={ele}
                            value={ele}
                            disabled={rest.disabledOptions ? rest.disabledOptions[idx] : false}
                        >
                            <Checkbox checked={value.indexOf(ele) > -1} />
                            <ListItemText primary={ele} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
