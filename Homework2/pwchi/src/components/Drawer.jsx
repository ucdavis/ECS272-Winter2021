import React from "react";
import { Drawer as MUIDrawer, ListItem, List, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    drawer: {
        width: "10%",
    },
});

const Drawer = (props) => {
    const { anchor, drawerInfo, setDrawerInfo, toggleDrawer } = props;
    const classes = useStyles();
    const itemsList = [
        {
            text: "Overview",
            onClick: () => {
                setDrawerInfo({ ...drawerInfo, page: "Overview" });
            },
        },
        {
            text: "Focus",
            onClick: () => {
                setDrawerInfo({ ...drawerInfo, page: "Focus" });
            },
        },
    ];
    return (
        <MUIDrawer
            className={classes.drawer}
            anchor={anchor}
            open={drawerInfo[anchor]}
            onClose={toggleDrawer(anchor, false)}
        >
            <List>
                {itemsList.map((item) => {
                    const { text, onClick } = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
        </MUIDrawer>
    );
};

export default Drawer;
