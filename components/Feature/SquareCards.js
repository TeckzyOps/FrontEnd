import React from 'react';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
// import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useTextAlign } from '~/theme/common';

const tiers = [
  { title: 'Freelancing', imgsrc: "static/images/freelance.png" },
  { title: 'Groom/Bride', imgsrc: "static/images/bride.svg" },
  { title: 'Vendor', imgsrc: "static/images/vendor.svg" },
  { title: 'Seller', imgsrc: "https://img.icons8.com/cute-clipart/100/000000/shop.png" },
  { title: 'Worker', imgsrc: "https://img.icons8.com/bubbles/100/000000/worker-male.png" }
];

const useStyles = makeStyles(theme => ({
  pricingWrap: {
    padding: '.5rem',
    justifyContent: 'center',
  },
  cardHeader: {
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

export default function SquareCards() {
  const classes = useStyles();
  const align = useTextAlign();

  return (
    <Container>
      <div>
        <Grid justify="center" md={12} container spacing={5} item>
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid className={classes.pricingWrap} justify="space-around" key={tier.title} xs={12} sm={3} md={2}>
              <Card >
                {/* <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                /> */}
                <CardContent>
                  <div className={classes.cardPricing}>
                    <img src={tier.imgsrc} width="100%" height="150" />
                  </div>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.title}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
