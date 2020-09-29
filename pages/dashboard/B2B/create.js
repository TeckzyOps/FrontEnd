import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Head from "next/head";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import withAuth from "../../../components/Hoc/withAuth";
import LocalStorageService from "../../../_services/LocalStorageService";
import Dashboard from "../../../components/Dashboard/DashboardWrap";
const localStorageService = LocalStorageService.getService();
import B2bForm from "../../../components/Dashboard/B2bForm";

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const create = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>B2B &nbsp; - New Application</title>
			</Head>
			<Dashboard>
				<div className={classes.root}>
					<B2bForm {...props} />
				</div>
			</Dashboard>
		</Fragment>
	);
};
export default create;
