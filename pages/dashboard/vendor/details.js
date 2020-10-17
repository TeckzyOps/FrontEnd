import React, { useState } from "react";
import withAuth from "../../../components/Hoc/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import routerLink from "~/static/text/link";
import Link from "@material-ui/core/Link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Grid, CardContent, Card, Button, Divider } from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../../_services/LocalStorageService";
import Header from "../../../components/Header";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import { Fab, useMediaQuery, Tab, Tabs } from "@material-ui/core/";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import BookingModule from "../../../components/GenericPopup/BookingModule";
import api, {
	addBearerToken,
	removeBearerToken,
} from "../../../utils/httpClient";

import { vendorActions } from "../../../_actions/vendor.action";
const localStorageService = LocalStorageService.getService();
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh", flexGrow: 1 },
	card: {
		minWidth: 275,
	},
	title: {
		fontSize: 14,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	dl: {
		marginBottom: "50px",
	},
	dt: {
		background: "#5f9be3",
		color: "#fff",
		float: "left",
		fontWeight: "bold",
		marginRight: "10px",
		padding: "5px",
		width: "100px",
	},
	dd: {
		margin: "2px 0",
		padding: "5px 0",
	},
	"& hr": {
		margin: theme.spacing(0, 0.5),
	},
	img: {
		height: 255,
		maxWidth: 400,
		overflow: "hidden",
		display: "block",
		width: "100%",
	},
	gridList: {
		flexWrap: "nowrap",
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: "translateZ(0)",
	},
	gridList_BG: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	table: {
		minWidth: 650,
	},
}));
const content = [
	{
		title: "title",
		button: "Read More",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBqiygfS-vkmnRHUq9Py3TE9sL8uxrWIii5w&usqp=CAU",
		user: "Luanda Gjokaj",
		userProfile: "",
	},
	{
		title: "title",
		button: "Discover",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT-Sove5vNZ_9gnleioO8HxSpI6Pe2bTi27Yw&usqp=CAU",
		user: "Erich Behrens",
	},
	{
		title: "title",
		button: "Buy now",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAZgq76yxXxF89lVYZLxDGflB7tS_6XI339g&usqp=CAU",
		user: "Bruno Vizovskyy",
	},
];
const details = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const [bookingPopup, setBookingPopup] = React.useState(false);
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);

	const [images, setImages] = React.useState([]);
	const maxSteps = images.length;
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	function getAllImages() {
		vendorActions
			.getMedia({ vendor_id: props.router.query.id, file_type: 1 })
			.then(function (response) {
				console.log("ressss", response);
				if (Array.isArray(response.data.data)) {
					setImages(response.data.data);
				}
			})
			.catch(function (error) {
				if (error.response && error.response.data.input_error) {
				}
				console.error("errrrr ", error);
			});
	}

	const { onToggleDark, onToggleDir } = props;
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [primaryImage, setprimaryImage] = React.useState(content[0].image);
	const [details, setdetails] = React.useState({});
	const [imageDialog, setimageDialog] = React.useState(false);
	const [familydetails, setfamilydetails] = React.useState({});
	const [lifetsyledetails, setlifetsyledetails] = React.useState({});
	const [defaultdetails, setdefaultdetails] = React.useState({});
	React.useEffect(() => {
		console.log(props);
		vendorActions
			.getVendor({ vendor_id: props.router.query.id })
			.then(function (response) {
				console.log("ressss", response);

				if (response.data.data.id) {
					setdetails(response.data.data);
					getAllImages();
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Vendor &nbsp; - Details</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<br></br>
				<Grid container spacing={2} justify="flex-end">
					<Grid item>
						<Link
							style={{ textDecoration: "none" }}
							href={
								routerLink.starter.vendornew + "?id=" + props.router.query.id
							}
						>
							<Button
								disabled={props.router.query.id == null}
								variant="outlined"
								color="primary"
							>
								Edit Details
							</Button>
						</Link>
					</Grid>
					<Grid item>
						<Button
							disabled={props.router.query.id == null}
							variant="outlined"
							color="primary"
							onClick={() => setBookingPopup(true)}
						>
							Booking Calendar
						</Button>
					</Grid>
				</Grid>
				<Grid container spacing={3} justify="space-around">
					<Grid
						style={{ borderRight: "0.5px dashed grey", padding: "0.6em" }}
						item
						md={5}
						xs={12}
					>
						{/* <Slider
							image={details.pictures != null ? details.pictures : ""}
						/> */}
						<Grid container justify="center">
							<Grid item>
								{maxSteps <= 0 && (
									<Typography
										align="center"
										component="h1"
										variant="h6"
										color="inherit"
									>
										Upload Some Images/Videos<br></br>to Showcase Here.
									</Typography>
								)}
								{maxSteps > 0 && (
									<div style={{ maxWidth: 400, flexGrow: 1 }}>
										<img
											className={classes.img}
											src={images.length > 0 && images[activeStep].file_path}
											alt={images.length > 0 && images[activeStep].file_path}
										/>
										<MobileStepper
											steps={maxSteps}
											position="static"
											variant="text"
											activeStep={activeStep}
											nextButton={
												<Button
													size="small"
													onClick={handleNext}
													disabled={activeStep === maxSteps - 1}
												>
													Next
													{theme.direction === "rtl" ? (
														<KeyboardArrowLeft />
													) : (
														<KeyboardArrowRight />
													)}
												</Button>
											}
											backButton={
												<Button
													size="small"
													onClick={handleBack}
													disabled={activeStep === 0}
												>
													{theme.direction === "rtl" ? (
														<KeyboardArrowRight />
													) : (
														<KeyboardArrowLeft />
													)}
													Back
												</Button>
											}
										/>
									</div>
								)}
							</Grid>

							{/* <Grid item xs={12}>
								<div className={classes.gridList_BG}>
									<GridList className={classes.gridList} cols={3.5}>
										{content.map((tile) => (
											<GridListTile key={tile.image}>
												<img
													onClick={() => setprimaryImage(tile.image)}
													src={tile.image}
													alt={tile.title}
												/>
											</GridListTile>
										))}
									</GridList>
								</div>
							</Grid> */}
						</Grid>

						<Grid style={{ paddingTop: "2%", textAlign: "center" }}>
							<Link
								style={{ textDecoration: "none" }}
								href={routerLink.starter.vendorVids + "?id=" + details.id}
							>
								<Button
									variant="contained"
									color="primary"
									size="large"
									style={{ marginRight: "1%" }}
								>
									Upload Videos
								</Button>
							</Link>
							<Link
								style={{ textDecoration: "none" }}
								href={routerLink.starter.vendorImg + "?id=" + details.id}
							>
								<Button
									variant="contained"
									color="primary"
									size="large"
									style={{ marginRight: "1%" }}
								>
									Upload Images
								</Button>
							</Link>
						</Grid>
					</Grid>

					<Grid item lg={7} md={7} xl={7} xs={12}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="vendor_Details">
								<TableBody>
									<TableCell align="left">Service Category</TableCell>
									<TableCell align="left">{details.service_category}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Sub Service</TableCell>
									<TableCell align="left">{details.sub_service}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Business Name</TableCell>
									<TableCell align="left">{details.bussiness_name}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Service Area</TableCell>
									<TableCell align="left">{details.service_area}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Total Experience</TableCell>
									<TableCell align="left">{details.total_experience}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Business Description</TableCell>
									<TableCell align="left">
										{details.bussineess_description}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Min Service Price</TableCell>
									<TableCell align="left">
										{details.min_service_price}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Max Service Price</TableCell>
									<TableCell align="left">
										{details.max_service_price}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Address</TableCell>
									<TableCell align="left">{details.address}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">City</TableCell>
									<TableCell align="left">{details.city}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">District</TableCell>
									<TableCell align="left">{details.district}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">State</TableCell>
									<TableCell align="left">{details.state}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Locality</TableCell>
									<TableCell align="left">{details.locality}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Office Map Link</TableCell>
									<TableCell align="left">{details.office_map_link}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Office Number</TableCell>
									<TableCell align="left">{details.office_number}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Catalog Pdf Path</TableCell>
									<TableCell align="left">{details.catalog_pdf_path}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Offer Tagline</TableCell>
									<TableCell align="left">{details.offer_tagline}</TableCell>
								</TableBody>

								{/* <TableBody>
<TableCell align="left">Advertisement File</TableCell>
<TableCell align="left">{details.advertisement_file_path}</TableCell>
</TableBody>
<TableBody>
<TableCell align="left">GST File</TableCell>
<TableCell align="left">{details.gst_file_path}</TableCell>
</TableBody>
<TableBody>
<TableCell align="left">License File</TableCell>
<TableCell align="left">{details.license_file_path}</TableCell>
</TableBody>
<TableBody>
<TableCell align="left">Certificate File</TableCell>
<TableCell align="left">{details.certificate_file_path}</TableCell>
</TableBody> */}
								<TableBody>
									<TableCell align="left">Commission Percent</TableCell>
									<TableCell align="left">
										{details.commission_percent}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Commission Percent</TableCell>
									<TableCell align="left">
										{details.commission_percent}
									</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Min Commission</TableCell>
									<TableCell align="left">{details.min_commission}</TableCell>
								</TableBody>
								<TableBody>
									<TableCell align="left">Max Commission</TableCell>
									<TableCell align="left">{details.max_commission}</TableCell>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
				<Dialog
					fullWidth
					fullScreen={fullScreen}
					maxWidth={"md"}
					open={bookingPopup}
					onClose={() => setBookingPopup(false)}
					aria-labelledby="max-width-dialog-title"
				>
					<DialogTitle id="max-width-dialog-title">
						Booking Calendar
					</DialogTitle>
					<DialogContent>
						<BookingModule apifor="vendor" booking_id={props.router.query.id} />
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

details.getInitialProps = ({ req, res }) => {
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
export default withRouter(details);
