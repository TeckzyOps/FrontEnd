import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Head from "next/head";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import withAuth from "../../../components/Hoc/withAuth";
import LocalStorageService from "../../../_services/LocalStorageService";
import Header from "../../../components/Header";
const localStorageService = LocalStorageService.getService();
import VendorForm from "../../../components/Dashboard/VendorForm";

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const Vendor = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Vendor &nbsp; - New Application</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<VendorForm {...props} />
			</div>
		</Fragment>
	);
};
export default Vendor;
