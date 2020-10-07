import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from "../../components/Header";
import Head from "next/head";

import AccountProfile from "../../components/Dashboard/Accountprofile";
import AccountDetails from "../../components/Dashboard/AccountDetails";
import ProfileForm from "../../components/Dashboard/ProfileForm";
import withAuth from "../../components/Hoc/withAuth";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();

import { profileActions } from "../../_actions/profile.action";
const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh" },
}));

const Account = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<Grid container spacing={4}>
					<Grid item lg={4} md={6} xl={4} xs={12}>
						<AccountProfile
							logindata={props.logindata}
							userdata={props.userdata}
						/>
					</Grid>
					<Grid item lg={8} md={6} xl={8} xs={12}>
						<div>
							<AccountDetails />
							<br />
							<br />
							<ProfileForm
								logindata={props.logindata}
								userdata={props.userdata}
							/>
						</div>
					</Grid>
				</Grid>
			</div>
		</Fragment>
	);
};
// Account.getInitialProps = async (ctx) => {
// 	return {
// 		logindata:
// 			typeof window !== "undefined"
// 				? ctx.req.headers.cookie.loginDetails
// 				: JSON.parse(LocalStorageService.getValue("loginDetails")),
// 		userdata:
// 			typeof window !== "undefined"
// 				? ctx.req.headers.cookie.userDetails
// 				: JSON.parse(LocalStorageService.getValue("userDetails")),
// 	};
// };
export default withAuth(Account);
