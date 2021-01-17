import React from "react";
import Router from "next/router";
import withAuth from "../../../components/Hoc/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	CardHeader,
	Divider,
	Button,
	Avatar,
} from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import Header from "../../../components/Header";
import Typography from "@material-ui/core/Typography";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import logo from "~/static/home/navbarLogo.jpg";
import CustomCard from "./card";
import { freelancerActions } from "../../../_actions/freelancer.action";
const localStorageService = LocalStorageService.getService();
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const sectionMargin = (margin) => margin * 2;
const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh", flexGrow: 1 },
	details: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flex: "1 0 auto",
	},

	media: {
		paddingTop: "56.25%",
	},
	content: {
		textAlign: "left",
		padding: theme.spacing(1),
	},
	divider: {
		margin: `${theme.spacing(3)}px 0`,
	},
	heading: {
		fontWeight: "bold",
	},
	subheading: {
		lineHeight: 1.8,
	},

	avatar: {
		display: "inline-block",
		border: "2px solid white",
		"&:not(:first-of-type)": {
			marginLeft: -theme.spacing(),
		},
	},
}));
const index = (props) => {
	const classes = useStyles();
	const [adList, setadList] = React.useState([]);
	React.useEffect(() => {
		freelancerActions
			.getFreelancer()
			.then(function (response) {
				console.log("ressss", response);

				if (Array.isArray(response.data.data)) {
					setadList(response.data.data);
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
	}, []);
	return (
		<React.Fragment>
			<Head>
				<title>Freelancer</title>
			</Head>

			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>

			<div className={classes.root}>
				<Grid alignContent="center" container>
					{adList &&
						adList.map((ad, index) => (
							<Grid key={index} item md={4} xs={12}>
								<Link
									style={{ textDecoration: "none" }}
									href={routerLink.starter.freelancernew + "?id=" + ad.id}
								>
									<CustomCard ad={ad} {...props} />
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
