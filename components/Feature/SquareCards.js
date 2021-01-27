import React from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardHeader from '@material-ui/core/CardHeader';
import Grid from "@material-ui/core/Grid";
// import StarIcon from '@material-ui/icons/StarBorder';
import { Typography, Box } from "@material-ui/core/";
import Container from "@material-ui/core/Container";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
} from "@material-ui/core/styles";
import { useTextAlign } from "~/theme/common";
import Link from "next/link";
import routerLink from "~/static/text/link";
import worker from "~/static/home/worker.jpg";
import seller from "~/static/home/seller.jpg";
import vendor from "~/static/home/vendor.jpg";
import grooms from "~/static/home/grooms.jpg";
import freelance from "~/static/home/freelancer.jpg";
import b2b from "~/static/home/b2b.jpg";
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const tiers = [
	{
		title: "Groom/Bride",
		imgsrc: grooms,
		url: routerLink.starter.matrimony,
	},
	{
		title: "Freelancing",
		imgsrc: freelance,
		url: routerLink.starter.freelancerSearch,
	},
	{
		title: "Vendor",
		imgsrc: vendor,
		url: routerLink.starter.vendorSearch,
	},
	{
		title: "Seller",
		imgsrc: seller,
		url: routerLink.starter.sellerSearch,
	},
	{
		title: "Worker",
		imgsrc: worker,
		url: routerLink.starter.workerSearch,
	},
	{
		title: "B2B Market",
		imgsrc: b2b,
		url: routerLink.starter.b2b,
	},
];

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	standarsbtn: {
		border: "none",
		borderRadius: "15px",
		cursor: "pointer",
		width: "100%",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export default function SquareCards() {
	const classes = useStyles();
	const align = useTextAlign();

	return (
		<div className={classes.root}>
			<Grid justify="center" container spacing={5}>
				{tiers.map((tier, i) => (
					<Grid key={i} item sm={4} xs={4} md>
						<div>
							<IconButton
								style={{ textDecoration: "none" }}
								href={tier.url}
								variant="outlined"
								color="secondary"
								className={classes.standarsbtn}
								aria-label={tier.title}
							>
								<img
									src={tier.imgsrc}
									width="130%"
									style={{ borderRadius: "10px" }}
								/>
							</IconButton>
							<br />
							<MuiThemeProvider theme={theme}>
								<Typography variant="caption" display="block" gutterBottom>
									<Box fontWeight="fontWeightBold" m={1}>
										{tier.title}
									</Box>
								</Typography>
							</MuiThemeProvider>
						</div>
					</Grid>
				))}
			</Grid>
		</div>
		// <Container>
		// 	<div>
		// 		<Card>
		// 			<CardContent>
		// 				{tiers.map((tier) => (
		// 					// Enterprise card is full width at sm breakpoint
		// 					<Grid
		// 						className={classes.root}
		// 						justify="space-around"
		// 						key={tier.title}
		// 						xs={12}
		// 						sm={3}
		// 						md={2}
		// 					>
		// 						<div>
		// 							<img src={tier.imgsrc} width="50%" />
		// 						</div>

		// 						{/* <CardHeader
		//               title={tier.title}
		//               subheader={tier.subheader}
		//               titleTypographyProps={{ align: 'center' }}
		//               subheaderTypographyProps={{ align: 'center' }}
		//               action={tier.title === 'Pro' ? <StarIcon /> : null}
		//               className={classes.cardHeader}
		//             /> */}
		// 					</Grid>
		// 				))}
		// 			</CardContent>
		// 		</Card>
		// 	</div>
		// </Container>
	);
}
