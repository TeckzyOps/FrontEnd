import React from "react";
import {
	makeStyles,
	useTheme,
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Button,
	Box,
	Divider,
	Link,
	useMediaQuery,
	Grid,
} from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import BookingModule from "../../../components/GenericPopup/BookingModule";
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		flexGrow: 1,
		margin: theme.spacing(2),
	},
});

const FilterCard = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(2.1);
	const [bookingPopup, setBookingPopup] = React.useState(false);
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	console.log("FILTERCARD :: ", props);
	const { fullview, ad, setAd, index } = props;
	if (ad.id) {
		if (fullview) {
			return (
				<div>
					{/* <Box border={1} borderColor="primary"> */}
					<Divider variant="middle" />
					<Grid className={classes.root} container>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Rating : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<Box component="fieldset" mb={3} borderColor="transparent">
								<Rating name="read-only" value={parseInt(ad.rating)} readOnly />
							</Box>
						</Grid>

						{/* Starting Card Details */}
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Service : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.service_category}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Service's Area : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.service_area}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Price Range : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.min_service_price + "-" + ad.max_service_price}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Offers/Tagline : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.offer_tagline}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Profession's Name : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.bussiness_name}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid container justify="center" alignItems="center">
							<Grid item xs={4}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500 }}
										variant="caption"
										display="block"
										gutterBottom
										noWrap
									>
										City/Town
									</Typography>
									<Typography
										variant="caption"
										display="block"
										gutterBottom
										noWrap
									>
										{ad.city}
									</Typography>
								</MuiThemeProvider>
							</Grid>
							<Grid item xs={4}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500 }}
										variant="caption"
										display="block"
										gutterBottom
										noWrap
									>
										District
									</Typography>
									<Typography
										variant="caption"
										display="block"
										gutterBottom
										noWrap
									>
										{ad.district}
									</Typography>
								</MuiThemeProvider>
							</Grid>
							<Grid item xs={4}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500 }}
										variant="caption"
										display="block"
										gutterBottom
										noWrap
									>
										State
									</Typography>
									<Typography
										variant="caption"
										display="block"
										gutterBottom
										noWrap
									>
										{ad.state}
									</Typography>
								</MuiThemeProvider>
							</Grid>
						</Grid>
					</Grid>
					{/* </Box> */}
					<Divider variant="middle" />
					{/* <Box border={1} borderColor="primary"> */}
					<Grid className={classes.root} container>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Profession's Since : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.bussiness_since}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Booking Calendar : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<Link
									component="button"
									onClick={() => setBookingPopup(true)}
									style={{ textDecoration: "none" }}
									color="primary"
								>
									View
								</Link>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Catalog : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<Link
									target="_blank"
									rel="noopener"
									rel="noreferrer"
									style={{ textDecoration: "none" }}
									href={ad.catalog_pdf_path.catalog_path}
									color="primary"
								>
									View
								</Link>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Call/Visit Time : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.work_start_time + " - " + ad.work_end_time}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Not Working Day : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{JSON.parse(ad.close_day).join(",")}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={12}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{ fontWeight: 500, align: "right" }}
										variant="caption"
										color="inherit"
										noWrap
									>
										Profession's Description : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={12}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.bussineess_description}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid
							container
							style={{ textAlign: "center" }}
							justify="center"
							alignItems="center"
							spacing={2}
						>
							<Grid item container justify="center" xs={6}>
								<Button
									size="small"
									variant="contained"
									color="primary"
									fullWidth
								>
									Shortlist
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button
									size="small"
									variant="contained"
									color="primary"
									fullWidth
								>
									Add To Cart
								</Button>
							</Grid>
						</Grid>
						<Divider variant="middle" />
						<Grid
							container
							style={{ textAlign: "center" }}
							justify="center"
							alignItems="center"
						>
							<Grid item container justify="center" xs={12}>
								<Button size="small" variant="contained" color="primary">
									Unlock Contact Detail
								</Button>
							</Grid>
						</Grid>
					</Grid>
					{/* </Box> */}

					<Dialog
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
							<BookingModule
								editMode={false}
								apifor="freelancer"
								booking_id={ad.id}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setBookingPopup(false)} color="primary">
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			);
		} else {
			return (
				<Card className={classes.root}>
					<CardActionArea>
						<CardMedia
							component="img"
							alt="Contemplative Reptile"
							height="200"
							image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
							title="Contemplative Reptile"
						/>
						<IconButton
							color="secondary"
							style={{ position: "absolute", right: 0, top: 0 }}
							component="span"
						>
							<FavoriteIcon />
						</IconButton>
						<CardContent>
							<Grid container>
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500, align: "right" }}
												variant="caption"
												color="inherit"
												noWrap
											>
												Rating : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid item container justify="flex-start" xs={6}>
									<Box component="fieldset" mb={3} borderColor="transparent">
										<Rating name="read-only" value={value} readOnly />
									</Box>
								</Grid>

								{/* Starting Card Details */}
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500, align: "right" }}
												variant="caption"
												color="inherit"
												noWrap
											>
												Service : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography variant="caption" color="inherit" noWrap>
												{ad.service_category}
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>

								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500, align: "right" }}
												variant="caption"
												color="inherit"
												noWrap
											>
												Service's Area : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography variant="caption" color="inherit" noWrap>
												{ad.service_area}
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>

								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500, align: "right" }}
												variant="caption"
												color="inherit"
												noWrap
											>
												Price Range : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography variant="caption" color="inherit" noWrap>
												{ad.min_service_price + "-" + ad.max_service_price}
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>

								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500, align: "right" }}
												variant="caption"
												color="inherit"
												noWrap
											>
												Offers/Tagline : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography variant="caption" color="inherit" noWrap>
												{ad.offer_tagline}
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>

								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500, align: "right" }}
												variant="caption"
												color="inherit"
												noWrap
											>
												Profession's Name : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography variant="caption" color="inherit" noWrap>
												{ad.bussiness_name}
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>

								<Grid container justify="center" alignItems="center">
									<Grid item xs={4}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500 }}
												variant="caption"
												display="block"
												gutterBottom
												noWrap
											>
												City/Town
											</Typography>
											<Typography
												variant="caption"
												display="block"
												gutterBottom
												noWrap
											>
												{ad.city}
											</Typography>
										</MuiThemeProvider>
									</Grid>
									<Grid item xs={4}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500 }}
												variant="caption"
												display="block"
												gutterBottom
												noWrap
											>
												District
											</Typography>
											<Typography
												variant="caption"
												display="block"
												gutterBottom
												noWrap
											>
												{ad.district}
											</Typography>
										</MuiThemeProvider>
									</Grid>
									<Grid item xs={4}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{ fontWeight: 500 }}
												variant="caption"
												display="block"
												gutterBottom
												noWrap
											>
												State
											</Typography>
											<Typography
												variant="caption"
												display="block"
												gutterBottom
												noWrap
											>
												{ad.state}
											</Typography>
										</MuiThemeProvider>
									</Grid>
								</Grid>
							</Grid>
						</CardContent>
					</CardActionArea>

					<CardActions>
						<Grid container justify="center" alignItems="center">
							<Button
								onClick={() => setAd(index)}
								variant="contained"
								color="primary"
							>
								View Profile
							</Button>
						</Grid>
					</CardActions>
				</Card>
			);
		}
	} else {
		return <div></div>;
	}
};
FilterCard.propTypes = {
	setAd: PropTypes.func,
	index: PropTypes.number,
	ad: PropTypes.array.isRequired,
	fullview: PropTypes.bool.isRequired,
};

export default FilterCard;
