import React, { Fragment } from "react";
import Head from "next/head";
import brand from "../static/text/brand";
import ForgotPassword from "../components/Forms/ForgotPassword";

function Login() {
	axios = new ApiService();
	console.log(axios);
	return (
		<Fragment>
			<Head>
				<title>
					{brand.starter.name}
					&nbsp; - Retrieve Your Password
				</title>
			</Head>
			<div>
				<ForgotPassword />
			</div>
		</Fragment>
	);
}

ForgotPassword.getInitialProps = async () => ({
	namespacesRequired: ["common", "hosting-landing"],
});

export default Login;
