import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Head from "next/head";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import Header from "../components/Header";
import { Paper } from "@material-ui/core";
import Footer from "../components/Footer";
import brand from "../static/text/brand";
import PageNav from "../components/PageNav";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import service from "./../utils/ApiService";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardMedia from "@material-ui/core/CardMedia";
import NavigationIcon from "@material-ui/icons/Navigation";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FilterComponent from "../components/Filter/FilterComponent";

const sectionMargin = (margin) => margin * 2;
const useStyles = makeStyles((theme) => ({
	mainWrap: {
		position: "relative",
		width: "100%",
		overflow: "hidden",
	},
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	spaceBottom: {
		marginBottom: sectionMargin(theme.spacing(2)),
	},
	spaceTop: {
		paddingTop: sectionMargin(theme.spacing(0)),
	},
	containerWrap: {
		marginTop: "11vh",
	},
	root: {
		maxWidth: "275px",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
const Matrimony = (props) => {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	const { onToggleDark, onToggleDir } = props;

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Head>
				<title>
					{brand.starter.name}
					&nbsp; - MatriMony
				</title>
			</Head>
			<CssBaseline />
			<section id="home" />
			<div className={classes.mainWrap}>
				<Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} />
				<main className={clsx(classes.spaceTop)}></main>
				<Hidden mdDown>
					<PageNav />
				</Hidden>

				<section className={classes.containerWrap}>
					<FilterComponent />
					<Container fixed>
						<Card xs={12} md={4} lg={4} className={classes.root}>
							<CardContent>
								<CardMedia
									image={
										"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
									}
								/>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									Word of the Day
								</Typography>
								<Typography variant="h5" component="h2">
									-----------------
								</Typography>
								<Typography className={classes.pos} color="textSecondary">
									--------------------
								</Typography>
								<Typography variant="body2" component="p">
									----------------------
									<br />
									{'"a benevolent smile"'}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small"> enquire</Button>
							</CardActions>
						</Card>
					</Container>
				</section>
				{/* <div>
					<Fab onClick={handleClickOpen} variant="extended">
						<NavigationIcon className={classes.extendedIcon} />
						Filter
					</Fab>
				</div> */}

				<Footer toggleDir={onToggleDir} />
				{/* <Hidden mdDown>
					<Notification />
				</Hidden> */}
			</div>
		</React.Fragment>
	);
};

Matrimony.getInitialProps = async () => ({
	namespacesRequired: ["common"],
});

Matrimony.propTypes = {
	onToggleDark: PropTypes.func.isRequired,
	onToggleDir: PropTypes.func.isRequired,
};

export default Matrimony;
