import React from "react";
import withAuth from "../../../components/Hoc/withAuth";
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
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import BookingModule from "../../../components/GenericPopup/BookingModule";
import Typography from "@material-ui/core/Typography";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";
import { freelancerActions } from "../../../_actions/freelancer.action";
const localStorageService = LocalStorageService.getService();
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1),
		"& > *": {
			margin: theme.spacing(1),
		},
	},

	card: {
		maxWidth: 300,
		margin: "auto",
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
		padding: theme.spacing(3),
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
	const [bookingPopup, setBookingPopup] = React.useState(false);
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
				<title>Dashboard &nbsp; - Login</title>
			</Head>

			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
			<div className={classes.root}>
				<Grid container spacing={2} justify="flex-end">
					<Grid item>
						<Button
							variant="outlined"
							onClick={() => setBookingPopup(true)}
							color="secondary"
						>
							Booking Calendar
						</Button>
					</Grid>
					<Grid item></Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item lg={4} md={6} xl={4} xs={12}>
						<Card className={classes.addCard}>
							<div>
								<Typography variant="h6">Add More Profile</Typography>
								<Typography variant="subtitle" component="h2">
									New Freelancer Ad
								</Typography>
							</div>
							<div className={classes.col}>
								<Fab
									href={routerLink.starter.freelancernew}
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
									style={{ textDecoration: "none" }}
									href={routerLink.starter.freelancerDetails + "?id=" + ad.id}
								>
									<Card className={classes.card}>
										{/* <CardMedia
											className={classes.media}
											image={
												"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
											}
										/> */}
										<CardContent className={classes.content}>
											<MuiThemeProvider theme={theme}>
												<Typography
													className={"MuiTypography--heading"}
													variant={"h5"}
													gutterBottom
												>
													{ad.offer_tagline}
												</Typography>
												<Typography
													className={"MuiTypography--heading"}
													variant={"h6"}
													gutterBottom
												>
													{ad.bussiness_name}
												</Typography>
												<Typography variant="subtitle1" color="textSecondary">
													{ad.sub_service + " | " + ad.service_area}
												</Typography>
												<Typography
													className={"MuiTypography--subheading"}
													variant={"caption"}
												>
													{ad.bussineess_description}
												</Typography>
											</MuiThemeProvider>
											<Divider className={classes.divider} light />
										</CardContent>
										<CardActions>
											<Link
												target="_blank"
												to={ad.office_map_link}
												rel="noopener"
											>
												<IconButton>
													<ExploreIcon fontSize="large" />
												</IconButton>
											</Link>
										</CardActions>
									</Card>
								</Link>
							</Grid>
						))}
				</Grid>

				<Dialog
					fullWidth
					maxWidth={"md"}
					open={bookingPopup}
					onClose={() => setBookingPopup(false)}
					aria-labelledby="max-width-dialog-title"
				>
					<DialogTitle id="max-width-dialog-title">
						Booking Calendar
					</DialogTitle>
					<DialogContent>
						<BookingModule />
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setBookingPopup(false)} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</React.Fragment>
	);
};

export default withAuth(index);
