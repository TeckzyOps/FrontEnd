import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import {
	TableRow,
	Button,
	TableHead,
	TableContainer,
	TableCell,
	TableBody,
	Table,
	Link,
	Grid,
	Fab,
	Container,
	Typography,
} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Head from "next/head";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../components/Header";
import routerLink from "~/static/text/link";
import brand from "../static/text/brand";
import Router from "next/router";
import { useRouter } from "next/router";
import LocalStorageService from "../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
let theme = createMuiTheme();
const useStyles = makeStyles((theme) => ({
	cardroot: {
		minWidth: 200,
		minHeight: 200,
	},

	root: {
		paddingTop: "11vh",
		flexGrow: 1,
		height: "100%",
		display: "flex",
	},
}));

function createData(services, link) {
	return { services, link };
}

const rows = [
	createData("Matrimony", routerLink.starter.matrimonynew),
	createData("Freelancer", routerLink.starter.freelancernew),

	createData("Services Vendor", routerLink.starter.vendornew),
	createData("Goods Vendor", routerLink.starter.sellernew),
	createData("Hunarbaaz", routerLink.starter.workernew),
	createData("B2B Vendor", routerLink.starter.b2bnew),
];

export default function joinus(props) {
	const classes = useStyles();
	const { onToggleDark, onToggleDir } = props;
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>
					{brand.starter.name}
					&nbsp; - Join Us
				</title>
			</Head>
			<CssBaseline />
			<Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
			<div className={classes.root}>
				<Container maxWidth="md">
					<Grid
						container
						alignItems="center"
						justify="space-evenly"
						style={{ width: "100%" }}
						spacing={1}
					>
						{rows.map((row, index) => (
							<Grid item key={index} sm={4} xs={12}>
								<Link style={{ textDecoration: "none" }} href={row.link}>
									<Card className={classes.cardroot}>
										<CardContent>
											<Grid
												container
												direction="column"
												justify="center"
												alignItems="center"
											>
												<Grid item>
													<div>
														<Fab color="primary" aria-label="add">
															<AddIcon />
														</Fab>
													</div>
												</Grid>
												<Grid item>
													<Typography
														variant="h5"
														align="center"
														component="h2"
														gutterBottom={true}
													>
														New {row.services} Application
													</Typography>
												</Grid>
											</Grid>
											<Grid
												container
												direction="row"
												justify="center"
												alignItems="center"
											></Grid>
										</CardContent>
									</Card>
								</Link>
							</Grid>
						))}
					</Grid>
				</Container>
			</div>
		</div>
	);
}
