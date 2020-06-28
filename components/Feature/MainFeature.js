import React from 'react';
import Typography from '@material-ui/core/Typography';
import ListAlt from '@material-ui/icons/ListAlt';
import Search from '@material-ui/icons/Search';
import Compare from '@material-ui/icons/Compare';
import Grid from '@material-ui/core/Grid';
import useStyles from './feature-style';

function MainFeature() {
  const classes = useStyles();
  return (
    <div className={classes.pageSection}>
      <Grid container className={classes.root} spacing={6}>
        <Grid md={4} item>
          <div className={classes.featureList}>
            <ListAlt className={classes.icon} />
            <Typography variant="h5">
              Make a List of Item
            </Typography>
            <Typography variant="body1">
              Planning an Event is very crucial to make everything go smoothly and perfectly, For which you should create a list of things to buy.
            </Typography>
          </div>
        </Grid>
        <Grid md={4} item>
          <div className={classes.featureList}>
            <Search className={classes.icon} />
            <Typography variant="h5">
              Find Everything under one Umbrella.
            </Typography>
            <Typography variant="body1">
              Find vendors for everything you need for your event without going outside sitting on your home.
            </Typography>
          </div>
        </Grid>
        <Grid md={4} item>
          <div className={classes.featureList}>
            <Compare className={classes.icon} />
            <Typography variant="h5">
              Compare & Choose!
            </Typography>
            <Typography variant="body1">
              Compare between many vendors to choose what fit in your budget.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainFeature;
