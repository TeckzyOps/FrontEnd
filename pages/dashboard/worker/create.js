import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Dashboard from "../../../components/Dashboard/DashboardWrap";
import Head from "next/head";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import withAuth from "../../../components/Hoc/withAuth";
import LocalStorageService from "../../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import WorkerForm from "../../../components/Dashboard/WorkerForm";

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const CreateWorker = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Worker &nbsp; - New Application</title>
			</Head>
			<Dashboard>
				<div className={classes.root}>
					<WorkerForm />
				</div>
			</Dashboard>
		</Fragment>
	);
};
export default CreateWorker;
