import React from "react";
import withAuth from "../../components/Hoc/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../_services/LocalStorageService";
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import Typography from "@material-ui/core/Typography";
import MatrimonyProfile from "../../components/cards/MatrimonyProfile";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const localStorageService = LocalStorageService.getService();

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	addCard: {
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		height: "100%",
		maxWidth: 345,
		flexDirection: "column",
	},
}));
const Matrimony = (props) => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>

			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
			<div className={classes.root}>
				<Grid container spacing={4}>
					<Grid item lg={4} md={6} xl={4} xs={12}>
						<MatrimonyProfile></MatrimonyProfile>
					</Grid>
					<Grid item lg={4} md={6} xl={4} xs={12}>
						<Card className={classes.addCard}>
							<div className={classes.col}>
								<Fab color="primary" aria-label="add">
									<AddIcon />
								</Fab>
							</div>
							<div>
								<Typography variant="h6">Add More Profile</Typography>
								<Typography variant="subtitle" component="h2">
									Join You Frined
								</Typography>
							</div>
						</Card>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
};

export default withAuth(Matrimony);
