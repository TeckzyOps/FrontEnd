import React from "react";
import Router from "next/router";
import withAuth from "../../../components/Hoc/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card } from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import Typography from "@material-ui/core/Typography";
import MatrimonyProfile from "../../../components/cards/MatrimonyProfile";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";
import { matrimonyActions } from "../../../_actions/matrimony.action";
const localStorageService = LocalStorageService.getService();

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: "11vh",

		"& > *": {
			margin: theme.spacing(1),
		},
	},
	addCard: {
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		height: "100%",
		maxWidth: 345,
		flexDirection: "column",
	},
}));
const index = (props) => {
	const classes = useStyles();
	const [adList, setadList] = React.useState([]);
	React.useEffect(() => {
		console.log(routerLink);
		matrimonyActions
			.getMatrimonyAds()
			.then(function (response) {
				console.log("ressss", response);

				if (Array.isArray(response.data.data)) {
					setadList(response.data.data);
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
		console.error("dashboardprops--> ", adList);
	}, []);
	return (
		<React.Fragment>
			<Head>
				<title>Matrimony &nbsp; - Ad List</title>
			</Head>

			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
			<div className={classes.root}>
				<Grid container spacing={4}>
					<Grid item lg={4} md={6} xl={4} xs={12}>
						<Card className={classes.addCard}>
							<div>
								<Typography variant="h6">Add More Profile</Typography>
								<Typography variant="subtitle" component="h2">
									Join You Friend
								</Typography>
							</div>
							<div className={classes.col}>
								<Fab
									href={routerLink.starter.matrimonynew}
									color="primary"
									aria-label="add"
								>
									<AddIcon />
								</Fab>
							</div>
						</Card>
					</Grid>

					{adList &&
						adList.map((ad, index) => (
							<Grid item lg={4} md={6} xl={4} xs={12}>
								<Link
									href={routerLink.starter.matrimonyprofile + "?id=" + ad.id}
								>
									<MatrimonyProfile ad={ad} />
								</Link>
							</Grid>
						))}
				</Grid>
			</div>
		</React.Fragment>
	);
};
const redirectToLogin = (res) => {
	if (res) {
		res.writeHead(302, { Location: "/login" });
		res.end();
		res.finished = true;
	} else {
		Router.push("/login");
	}
};
const getCookieFromReq = (req, cookieKey) => {
	const cookie = req.headers.cookie
		.split(";")
		.find((c) => c.trim().startsWith(`${cookieKey}=`));

	if (!cookie) return undefined;
	return cookie.split("=")[1];
};

index.getInitialProps = ({ req, res }) => {
	const ISSERVER = typeof window === "undefined";
	let token = null;

	if (!ISSERVER) {
		token = localStorage.getItem("token");
	} else {
		token = getCookieFromReq(req, "token");
	}

	if (token == null) {
		console.log("GOING TO REDIRECT");
		redirectToLogin(res);
	}
	return {};
};
export default index;
