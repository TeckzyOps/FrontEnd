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
	CardHeader,
	CardContent,
	CardMedia,
	Typography,
	Button,
	Box,
	Icon,
	Divider,
	Tooltip,
	Link,
	useMediaQuery,
	Grid,
} from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import BookingModule from "../../../components/GenericPopup/BookingModule";
import BrokenImage from "~static/images/broken_image.svg";
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		flexGrow: 1,
		margin: theme.spacing(2),
	},
	media: {
		// this is the`className` passed to `CardMedia` later
		height: 200, // as an example I am modifying width and height
		width: "100%",
	},
	img: {
		height: 200, // as an example I am modifying width and height
		width: "100%",
	},
});

const FilterCard = (props) => {
	let classes = useStyles();
	const theme = useTheme();
	classes.label = {
		color: theme.palette.primary.main,
		fontWeight: 500,
		align: "right",
	};
	const [value, setValue] = React.useState(2.1);
	const [bookingPopup, setBookingPopup] = React.useState(false);
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	// function image() {
	// 	let allURLs = ad.images.length > 0 ? ad.images : null;
	// 	if (null == allURLs) {
	// 		return "invalid_link";
	// 	}

	// 	let working = [],
	// 		notWorking = [],
	// 		find = (url) =>
	// 			fetch(url.file_path, { mode: "no-cors" }).then((res) =>
	// 				res.ok
	// 					? working.push(res.url) && res
	// 					: notWorking.push(res.url) && res
	// 			);

	// 	Promise.all(allURLs.map(find)).then((responses) => {
	// 		console.log("woking", working, "notWorking", notWorking);
	// 		/* Do whatever with the responses if needed */
	// 	});

	// 	if (working) {
	// 		return working[0];
	// 	}

	// 	return "invalid_link";
	// }

	function validateUrl(url) {
		return new Promise((ok, fail) => {
			http
				.get(url, (res) => {
					return ok(res.statusCode == 200);
				})
				.on("error", (e) => ok(false));
		});
	}

	const { fullview, ad, setAd, index } = props;

	if (ad.id) {
		if (fullview) {
			return (
				<div>
					{/* <Box border={1} borderColor="primary"> */}
					<Divider variant="middle" />
					<Grid container justify="center" alignItems="center">
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="primary"
										noWrap
									>
										Rating : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid
							item
							container
							justify="flex-start"
							alignItems="flex-end"
							xs={6}
						>
							<div
								style={{
									display: "flex",
								}}
							>
								<Rating name="read-only" value={parseInt(ad.rating)} readOnly />
								<Box ml={2}>{ad.rating}</Box>
							</div>
						</Grid>

						{/* Starting Card Details */}
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="inherit"
										noWrap
									>
										Product : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.sub_service}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="inherit"
										noWrap
									>
										Delivery's Area : &nbsp;
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
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="inherit"
										noWrap
									>
										Business’s Name : &nbsp;
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

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="inherit"
										noWrap
									>
										Business’s Tagline : &nbsp;
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
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="inherit"
										noWrap
									>
										Business’s Product : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="caption" color="inherit" noWrap>
										{ad.bussineess_description}
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="primary"
										noWrap
									>
										Business’s Catalog : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<Tooltip
									enterTouchDelay
									title={
										null != ad.catalog_pdf_path
											? "View Catalog"
											: "Catalog Not Uploaded"
									}
								>
									<Link
										target="_blank"
										rel="noopener"
										rel="noreferrer"
										style={{ textDecoration: "none" }}
										href={
											null != ad.catalog_pdf_path &&
											ad.catalog_pdf_path.catalog_path
										}
										color={"primary"}
									>
										View
									</Link>
								</Tooltip>
							</div>
						</Grid>

						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="inherit"
										noWrap
									>
										Offers Coupon : &nbsp;
									</Typography>
								</MuiThemeProvider>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<Tooltip
									enterTouchDelay
									title={
										null != ad.product_coupon_path
											? "View Coupon"
											: "Not Available"
									}
								>
									<Link
										target="_blank"
										rel="noopener"
										rel="noreferrer"
										style={{ textDecoration: "none" }}
										href={
											null != ad.product_coupon_path && ad.product_coupon_path
										}
										color={"primary"}
									>
										View
									</Link>
								</Tooltip>
							</div>
						</Grid>
						<Grid item container justify="flex-start" xs={6}>
							<div style={{ display: "flex" }}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
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
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
											align: "right",
										}}
										variant="caption"
										color="inherit"
										noWrap
									>
										Don’t Call/Visit : &nbsp;
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

						<Grid container justify="center" alignItems="center">
							<Grid item xs={4}>
								<MuiThemeProvider theme={theme}>
									<Typography
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
										}}
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
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
										}}
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
										style={{
											color: theme.palette.primary.main,
											fontWeight: 500,
										}}
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
								<Button
									size="small"
									variant="contained"
									color="primary"
									fullWidth
								>
									Unlock Contact Detail
								</Button>
							</Grid>
						</Grid>
					</Grid>
					{/* </Box> */}
				</div>
			);
		} else {
			return (
				<Card className={classes.root}>
					<CardHeader
						titleTypographyProps={{
							variant: "button",
							className: classes.label,
						}}
						title={"Seller ID : " + ad.seller_member_id}
					/>
					<CardActionArea>
						<CardMedia alt={ad.bussiness_name} title={ad.bussiness_name}>
							<img
								src={
									Array.isArray(ad.images) && ad.images.length > 0
										? ad.images[0].file_path
										: "Invalid_Link"
								}
								onError={(e) => {
									/**
									 * Any code. For instance, changing the `src` prop with a fallback url.
									 * In our code, I've added `e.target.className = fallback_className` for instance.
									 */
									e.target.src = BrokenImage;
								}}
								className={classes.media}
							/>
						</CardMedia>
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
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
													align: "right",
												}}
												variant="caption"
												noWrap
											>
												Rating : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid
									item
									container
									justify="flex-start"
									alignItems="flex-end"
									xs={6}
								>
									<Box borderColor="transparent">
										<Rating
											name="read-only"
											value={parseInt(ad.rating)}
											readOnly
										/>
									</Box>
								</Grid>

								{/* Starting Card Details */}
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
													align: "right",
												}}
												variant="caption"
												color="inherit"
												noWrap
											>
												Product : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography variant="caption" color="inherit" noWrap>
												{ad.sub_service}
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>

								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
													align: "right",
												}}
												variant="caption"
												color="inherit"
												noWrap
											>
												Delivery's Area : &nbsp;
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
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
													align: "right",
												}}
												variant="caption"
												color="inherit"
												noWrap
											>
												Business’s Name : &nbsp;
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

								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
													align: "right",
												}}
												variant="caption"
												color="inherit"
												noWrap
											>
												Business’s Tagline : &nbsp;
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
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
													align: "right",
												}}
												variant="caption"
												color="inherit"
												noWrap
											>
												Business’s Product : &nbsp;
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>
								<Grid item container justify="flex-start" xs={6}>
									<div style={{ display: "flex" }}>
										<MuiThemeProvider theme={theme}>
											<Typography variant="caption" color="inherit" noWrap>
												{ad.bussineess_description}
											</Typography>
										</MuiThemeProvider>
									</div>
								</Grid>

								<Grid container justify="center" alignItems="center">
									<Grid item xs={4}>
										<MuiThemeProvider theme={theme}>
											<Typography
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
												}}
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
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
												}}
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
												style={{
													color: theme.palette.primary.main,
													fontWeight: 500,
												}}
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
