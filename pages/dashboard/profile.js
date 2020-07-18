import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import Head from "next/head";

import AccountProfile from "../../components/Dashboard/Accountprofile";
import AccountDetails from "../../components/Dashboard/AccountDetails";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
}));

const Account = () => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>
			<DashboardWrapper />
			<div className={classes.root}>
				<Grid container spacing={4}>
					<Grid item lg={4} md={6} xl={4} xs={12}>
						<AccountProfile />
					</Grid>
					<Grid item lg={8} md={6} xl={8} xs={12}>
						<AccountDetails />
					</Grid>
				</Grid>
			</div>
		</Fragment>
	);
};

export default Account;
