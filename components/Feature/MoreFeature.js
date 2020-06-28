import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactWOW from 'react-wow';
import useStyles from './feature-style';
import { useTextAlign } from '~/theme/common';
import SquareCards from './SquareCards';
// import imgAPI from '~/static/images/imgAPI';

function MainFeature() {
  const classes = useStyles();
  const align = useTextAlign();
  return (
    <div className={clsx(classes.featureMore)}>
      <Grid container className={classes.root} spacing={6}>
        <Grid md={12} item>
          <div className={classes.featureMore}>
            <div className={clsx(align.textCenter, classes.featureItem, classes.last)}>
              <ReactWOW animation="fadeInUp" duration="0.6s">
                <Typography variant="h3" className={classes.title}>
                Search By Religion
                </Typography>
              </ReactWOW>
              <ReactWOW animation="fadeInUp" delay="0.3s" duration="0.6s">
                {/* <Typography variant="body1" className={classes.text}>
                  Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus.
                </Typography> */}
              </ReactWOW>
              <ReactWOW animation="zoomIn" delay="0.3s" duration="0.6s">
                {/* <div className={classes.deco2} /> */}
              </ReactWOW>
              <ReactWOW animation="fadeInUp" delay="0.5s" duration="0.6s">
                {/* <figure className={classes.imgFull}>
                  <img src={imgAPI.photo[5]} alt="img" />
                </figure> */}
                <SquareCards />
              </ReactWOW>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid md={6} item>
          <div className={classes.featureItem}>
            <ReactWOW animation="fadeInLeft" duration="0.6s">
              <Typography variant="h3" className={classes.title}>
              Connecting Peoples with Local Vendors
              </Typography>
            </ReactWOW>
            <ReactWOW animation="fadeInLeft" delay="0.3s" duration="0.6s">
              <Typography variant="body1" className={classes.text}>
              With unmatched local business information, photos and review content, We provide you with a one-stop local platform for consumers to discover, connect and transact with local businesses of all sizes by making it easy to request a quote, join a waitlist, and make a reservation, appointment or purchase.
              </Typography>
            </ReactWOW>
          </div>
        </Grid>
        <Grid md={6} item>
          <div className={classes.featureItem}>
            <ReactWOW animation="zoomIn" delay="0.3s" duration="0.6s">
              <div className={classes.deco1} />
            </ReactWOW>
            <ReactWOW animation="fadeInRight" delay="0.5s" duration="0.6s">
              <figure className={classes.img}>
                <img src="https://cdn.searchenginejournal.com/wp-content/uploads/2016/07/Depositphotos_44001907_m-2015-760x400.jpg" width="100%" height="100%" alt="img" />
              </figure>
            </ReactWOW>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid md={6} item>
          <div className={classes.featureItem}>
            <ReactWOW animation="zoomIn" delay="0.3s" duration="0.6s">
              <div className={classes.deco1} />
            </ReactWOW>
            <ReactWOW animation="fadeInLeft" delay="0.5s" duration="0.6s">
              <figure className={classes.img}>
                <img src="http://blog.juggernaut.in/wp-content/uploads/2018/02/pexels-photo-38870-1024x676.jpeg" alt="img" />
              </figure>
            </ReactWOW>
          </div>
        </Grid>
        <Grid md={6} item>
          <div className={classes.featureItem}>
            <ReactWOW animation="fadeInRight" duration="0.6s">
              <Typography variant="h3" className={classes.title}>
                Register/Search for your Soulmate
              </Typography>
            </ReactWOW>
            <ReactWOW animation="fadeInRight" delay="0.3s" duration="0.6s">
              <Typography variant="body1" className={classes.text}>
                Register with us on our Matrimonial section to get listed on our page or You can also search for your soulmate.
              </Typography>
            </ReactWOW>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainFeature;
