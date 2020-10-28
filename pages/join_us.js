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
	Container,
	Typography,
} from "@material-ui/core/";
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
	root: {
		height: "100%",
		display: "flex",
	},
	styledTblRow: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
	mainWrap: {
		position: "relative",
		width: "100%",
		overflow: "hidden",
	},
}));

function createData(services, link) {
	return { services, link };
}

const rows = [
	createData("Matrimony", routerLink.starter.matrimony),
	createData("Freelancer", routerLink.starter.freelancer),

	createData("Vendor", routerLink.starter.vendor),
	createData("Seller", routerLink.starter.seller),
	createData("Worker", routerLink.starter.worker),
	createData("B2B", routerLink.starter.b2b),
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
				<Container maxWidth="sm">
					<Grid
						container
						style={{ width: "100%", height: "100vh" }}
						spacing={0}
						align="center"
						justify="center"
						direction="column"
					>
						<Grid item>
							<TableContainer component={Paper}>
								<Table>
									<TableBody>
										{rows.map((row) => (
											<TableRow
												className={classes.styledTblRow}
												key={row.services}
											>
												<TableCell align="center">
													<Typography variant="h5">{row.services}</Typography>
												</TableCell>
												<TableCell align="center">
													<Link
														style={{ textDecoration: "none" }}
														href={row.link}
													>
														<Button variant="outlined" color="primary">
															Manage
														</Button>
													</Link>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
				</Container>
			</div>
		</div>
	);
}
