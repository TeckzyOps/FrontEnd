import React, { Fragment } from "react";
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import Head from "next/head";

export default function UserDashBoard(props) {
	return (
		<Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>
			<DashboardWrapper />
		</Fragment>
	);
}
