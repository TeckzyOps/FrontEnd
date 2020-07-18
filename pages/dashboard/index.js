import React, { Fragment } from "react";
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		//background: 'linear-gradient(5deg, #edb600 30%, #FF8E53 90%)',
		padding: theme.spacing(3),
		margin: "center",
		maxWidth: 600,
		minHeight: 150,
	},
	img: {
		//background: 'linear-gradient(45deg, #F5FB8B 30%, #F5FB8B 90%)',
		margin: "auto",
		width: 128,
		height: 128,
	},
	image: {
		// background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		position: "relative",
		margin: "center",
		display: "flex",
		width: 128,
		height: 128,
	},
	avatar: {
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%",
	},

	gridbox: {
		position: "relative",
		margin: "center",
	},

	resumo: {
		//background: "linear-gradient(45deg, #5DA6AF 30%, #FF8E53 90%)",
		width: "400px",
		height: "100px",
		padding: "2px",
		display: "flex",
	},
	rating: {
		//background: 'linear-gradient(45deg, #0bb654 30%, #0bb654 90%)',
		position: "relative",
		left: "4px",
		display: "flex",
		padding: "5px",
		//container justify="center" spacing={spacing}
	},

	hashtag: {
		margin: "2px",
		padding: "1px",
	},

	favorite: {
		height: "50px",
	},

	agenda: {
		maxWidth: "80px",
		fontFamily: "arial",
		fontSize: "12px",
	},
}));
export default function UserDashBoard(props) {
	const classes = useStyles();
	const [value /*setValue*/] = React.useState(1);
	return (
		<Fragment>
			<Head>
				<title>Dashboard &nbsp; - Login</title>
			</Head>
			<DashboardWrapper />
		</Fragment>
	);
}
