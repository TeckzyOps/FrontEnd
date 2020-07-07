import React, { useState } from "react";
import CountUp from "react-countup";
import ReactWOW from "react-wow";
import Typography from "@material-ui/core/Typography";
import IosLeafOutline from "react-ionicons/lib/IosLeafOutline";
import IosBulbOutline from "react-ionicons/lib/IosBulbOutline";
import IosIonitronOutline from "react-ionicons/lib/IosIonitronOutline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useStyles from "./counter-style";

const tiers = [
	{ title: "Freelancing", count: 123 },
	{ title: "Groom/Bride", count: 251 },
	{ title: "Vendor", count: 150 },
	{ title: "Seller", count: 440 },
	{ title: "Worker", count: 650 },
];
function Counter() {
	const classes = useStyles();
	const [play, setPlay] = useState(false);
	const countup = (val, isPlay) => (
		<span>{isPlay ? <CountUp end={val} /> : 0}</span>
	);
	const handlePlay = () => {
		setTimeout(() => {
			setPlay(true);
		}, 500);
	};
	return (
		<div className={classes.root}>
			<Grid justify="center" container spacing={3}>
				{tiers.map((tier, i) => (
					<Grid key={i} xs={6} sm={6} item md>
						<ReactWOW animation="fadeIn" offset={300} callback={handlePlay}>
							<div className={classes.counterItem}>
								<div className={classes.text}>
									<Typography variant="h4">
										{countup(tier.count, play)}
									</Typography>
									<Typography variant="h6">{tier.title}</Typography>
								</div>
							</div>
						</ReactWOW>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

export default Counter;
