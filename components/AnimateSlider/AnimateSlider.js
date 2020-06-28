/* eslint-disable */ 
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Slider from 'react-animated-slider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyles from './slider-style';
import 'react-animated-slider/build/horizontal.css';
import { withTranslation } from '~/i18n';
import '~/vendors/animate-slider.css';
import imgAPI from '~/static/images/imgAPI';

import AwesomeSlider from 'react-awesome-slider';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

const content = [
  {
    title: 'title',
    button: 'Read More',
    image: 'https://www.weddingwishlist.com/wedding-board/wp-content/uploads/2019/01/Wedding-Planners-in-Kolkata-1024x538.jpg',
    user: 'Luanda Gjokaj',
    userProfile: imgAPI.avatar[2],
  },
  {
    title: 'title',
    button: 'Discover',
    image: 'http://www.hamaraevent.com/lib/js/kcfinder/upload/images/image1%2825%29.jpeg',
    user: 'Erich Behrens',
    userProfile: imgAPI.avatar[7],
  },
  {
    title: 'title',
    button: 'Buy now',
    image: 'http://www.hamaraevent.com/lib/js/kcfinder/upload/images/image3%2818%29.jpeg',
    user: 'Bruno Vizovskyy',
    userProfile: imgAPI.avatar[8],
  }
];
const sT = {
  className: "",
  speed: 1500,
  dots: true,
  startup: true,
  startupScreen: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  scrollable: true,
  draggable: true,
  resizable: true,
  };

export function TopSlider(props){
  const classes = useStyles();
  const { t } = props;
  return (
    <AwesomeSlider
    {...sT}
    animation="foldOutAnimation"
    cssModule={[CoreStyles, AnimationStyles]}
  >
  {content.map((item, index) => (
            <div
              key={index.toString()}
              data-src={item.image}
              style={{zIndex:999}}
            >
              <div className="content">
                {/* <video playsinline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                  <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                  <track default kind="captions" srcLang="en" src="" />
                </video> */}
                <Grid container spacing={2} justify="center">
                    <Grid item>
                    <Typography variant="h1">{t('common:' + item.title)}</Typography>
                    <Typography variant="body1">{t('starter-landing:description_text')}</Typography>
                    </Grid>
                  </Grid>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="contained" color="primary">
                        View Tutorial
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary">
                        Start Now!
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
              {/* <section>
                <img src={item.userProfile} alt={item.user} />
                <span>
                  Posted by&nbsp;
                  <strong>{item.user}</strong>
                </span>
              </section> */}
            </div>
          ))}
   
  </AwesomeSlider>
  );
 
}

function AnimateSlider(props) {
  const classes = useStyles();
  const { t } = props;
  return (
    <div className={classes.heroContent}>
      <Slider className="slider-wrapper">
        {content.map((item, index) => (
          <div
            key={index.toString()}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` }}
          >
            <div className="inner">
              {/* <video playsinline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                <track default kind="captions" srcLang="en" src="" />
              </video> */}
              <Typography variant="h1">{t('common:' + item.title)}</Typography>
              <Typography variant="body1">{t('starter-landing:description_text')}</Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      View Tutorial
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Start Now!
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
            {/* <section>
              <img src={item.userProfile} alt={item.user} />
              <span>
                Posted by&nbsp;
                <strong>{item.user}</strong>
              </span>
            </section> */}
          </div>
        ))}

     </Slider>
    </div>
  );
}

AnimateSlider.propTypes = {
  t: PropTypes.func.isRequired,
};

AnimateSlider.getInitialProps = async () => ({
  namespacesRequired: ['common', 'starter-landing'],
});

export default withTranslation(['common', 'starter-landing'])(AnimateSlider);
