import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import Head from "next/head";

import AccountProfile from "../../components/Dashboard/Accountprofile";
import AccountDetails from "../../components/Dashboard/AccountDetails";
import ProfileForm from "../../components/Dashboard/ProfileForm";
import withAuth from "../../components/Hoc/withAuth";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import { profileActions } from "../../_actions/profile.action";
import FreelancerForm from "../../components/Dashboard/FreelancerForm";
import FreelancerProfileStatus from "./../../components/Dashboard/FreelancerProfileStatus";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
}));

const Freelancer = (props) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>
			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
			<div className={classes.root}>
				<Grid container spacing={4}>
					<Grid item lg={4} md={4} xl={4} xs={12}>
						{/* <AccountProfile
							logindata={props.logindata}
							userdata={props.userdata}
						/> */}

						<FreelancerProfileStatus />
					</Grid>
					<Grid item lg={8} md={8} xl={8} xs={12}>
						<div>
							<FreelancerForm />
						</div>
					</Grid>
				</Grid>
			</div>
		</Fragment>
	);
};
export default Freelancer;
