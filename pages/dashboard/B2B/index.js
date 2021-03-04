import React from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	Button,
} from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import Header from "../../../components/Header";
import Typography from "@material-ui/core/Typography";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import CustomCard from "./card";
import { b2bActions } from "../../../_actions/b2b.action";
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
	root: { paddingTop: "11vh" },

	card: {
		maxWidth: 300,
		margin: "auto",
		display: "flex",
		flexDirection: "column",
		transition: "0.3s",
		boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
		},
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
	const { onToggleDark, onToggleDir } = props;
	React.useEffect(() => {
		b2bActions
			.getB2b()
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
				<title>B2B &nbsp;</title>
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
									href={routerLink.starter.b2bnew + "?id=" + ad.id}
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

export default index;
