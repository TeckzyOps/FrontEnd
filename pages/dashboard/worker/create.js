import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import Head from "next/head";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import withAuth from "../../../components/Hoc/withAuth";
import LocalStorageService from "../../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import WorkerForm from "../../../components/Dashboard/WorkerForm";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
}));

const CreateWorker = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>
			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
			<div className={classes.root}>
				<WorkerForm />
			</div>
		</Fragment>
	);
};
export default CreateWorker;
