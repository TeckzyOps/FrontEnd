import React, { Fragment } from "react";
import Header from "../../components/Header";
import Head from "next/head";
import FormPasswordReset from "../../components/Forms/Dashboard/changePassword";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: "auto",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));
const ChnagePassword = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<Head>
				<title>Chnage Password &nbsp;</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<Grid
				lg={6}
				md={6}
				xs={12}
				alignItems="center"
				justify="center"
				className={classes.root}
			>
				<FormPasswordReset />
			</Grid>
		</Fragment>
	);
};

export default ChnagePassword;
