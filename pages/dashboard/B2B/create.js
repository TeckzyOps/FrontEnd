import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import Header from "../../../components/Header";
const localStorageService = LocalStorageService.getService();
import B2bForm from "../../../components/Dashboard/B2bForm";

const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh" },
}));

const create = (props) => {
	const classes = useStyles();
	const { onToggleDark, onToggleDir } = props;

	return (
		<Fragment>
			<Head>
				<title>B2B &nbsp; - New Application</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<B2bForm {...props} />
			</div>
		</Fragment>
	);
};

export default create;
