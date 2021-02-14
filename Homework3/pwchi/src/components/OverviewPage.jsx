import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";

import Chord from "./Chord";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: "16px",
    marginBottom: "16px",
  },
  item: {
    display: "flex",
  },
  paper: {
    color: theme.palette.text.secondary,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
}));

const OverviewPage = (props) => {
  const { data, visible, setOverviewSelectInfo, isFocusUpdate } = props;

  const returnClickedItems = (clickedItems) => {
    const { parent, children } = clickedItems;
    setOverviewSelectInfo((overviewSelectInfo) => ({
      ...overviewSelectInfo,
      column: parent,
      rows: children,
    }));
  };

  const classes = useStyles();

  return visible ? (
    <div id="overview-page">
      <Grid className={classes.root} container alignItems="stretch">
        <Grid className={classes.item} item xs={12}>
          <Paper className={classes.paper}>
            <Chord
              data={data}
              returnClickedItems={returnClickedItems}
              toCleanClickedItems={isFocusUpdate}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  ) : null;
};

export default OverviewPage;
