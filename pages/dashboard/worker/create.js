import React, { Fragment } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Header from "../../../components/Header";
import Head from "next/head";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import withAuth from "../../../components/Hoc/withAuth";
import LocalStorageService from "../../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import WorkerForm from "../../../components/Dashboard/WorkerForm";

const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh" },
}));

const CreateWorker = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Worker &nbsp; - New Application</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<WorkerForm {...props} />
			</div>
		</Fragment>
	);
};

export default CreateWorker;
