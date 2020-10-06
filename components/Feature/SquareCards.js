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
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
} from "@material-ui/core/styles";
import { useTextAlign } from "~/theme/common";
<<<<<<< HEAD

=======
import Link from "next/link";
import links from "~/static/text/link.js";
import worker from "~/static/images/worker.svg";
import seller from "~/static/images/seller.svg";
import vendor from "~/static/images/vendor.svg";
import bride from "~/static/images/bride.svg";
import freelance from "~/static/images/freelance.svg";
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const tiers = [
<<<<<<< HEAD
	{ title: "Groom/Bride", imgsrc: "static/images/bride.svg" },
	{ title: "Freelancing", imgsrc: "static/images/freelance.svg" },
	{ title: "Vendor", imgsrc: "static/images/vendor.svg" },
	{
		title: "Seller",
		imgsrc: "static/images/seller.svg",
	},
	{
		title: "Worker",
		imgsrc: "static/images/worker.svg",
=======
	{
		title: "Groom/Bride",
		imgsrc: bride,
		url: links.starter.matrimony,
	},
	{
		title: "Freelancing",
		imgsrc: freelance,
		url: links.starter.freelancer,
	},
	{ title: "Vendor", imgsrc: vendor, url: links.starter.vendor },
	{
		title: "Seller",
		imgsrc: seller,
		url: links.starter.seller,
	},
	{
		title: "Worker",
		imgsrc: worker,
		url: links.starter.worker,
>>>>>>> 2eb69cad9f98587f8f61f10b85e899630956e00b
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
			<Grid justify="center" container spacing={3}>
				{tiers.map((tier, i) => (
					<Grid key={i} item sm={4} xs={4} md>
						<IconButton
							variant="outlined"
							color="secondary"
							className={classes.standarsbtn}
							aria-label={tier.title}
						>
							<img src={tier.imgsrc} width="50%" />
						</IconButton>
						<br />
						<MuiThemeProvider theme={theme}>
							<Typography variant="caption" display="block" gutterBottom>
								{tier.title}
							</Typography>
						</MuiThemeProvider>
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
