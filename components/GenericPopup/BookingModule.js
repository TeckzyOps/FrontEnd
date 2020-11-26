import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	TextField,
	Container,
	Typography,
	Tooltip,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	CssBaseline,
	Divider,
	List,
	InputAdornment,
	ListItemText,
	ListItem,
	ListItemAvatar,
	Avatar,
	MenuItem,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Badge } from "@material-ui/core";
import Head from "next/head";
import LocalStorageService from "../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import Link from "@material-ui/core/Link";
import SendIcon from "@material-ui/icons/Send";
import { bookingActions } from "../../_actions/booking.action";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router";
import { useTheme } from "@material-ui/core/styles";
import { partly } from "~static/text/bookingCalendar";
const useStyles = makeStyles((theme) => ({
	root: {},
	booked: {
		boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
		borderRadius: "50%",
	},
}));

const BookingModule = ({ booking_id, ...props }) => {
	const classes = useStyles();
	const [img, setImg] = React.useState({});
	const theme = useTheme();

	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const [date, changeDate] = React.useState(new Date());
	const [remoteData, setRemoteData] = React.useState([]);
	const [remoteError, setRemoteError] = React.useState("");
	const [bookingInit, setBookingInit] = React.useState(false);
	const [comments, setComments] = React.useState(null);
	const [selectedDays, setSelectedDays] = React.useState({});
	const [bookingStatus, setbookingStatus] = React.useState(1);
	const apifor_id = props.apifor + "_id";
	function formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}

	const handlebookingstatusChange = (event) => {
		setbookingStatus(event.target.value);
	};
	React.useEffect(() => {
		if (booking_id) {
			getBookings();
		}
	}, []);

	React.useEffect(() => {
		console.log("selectedDays :: ", selectedDays);
	}, [selectedDays]);

	function getBookings(data) {
		let d = date;
		if (data) {
			d = data;
		}
		let mm = ("0" + (new Date(d).getMonth() + 1)).slice(-2);
		let yyyy = new Date(d).getFullYear();
		let payload = { month: mm, year: yyyy };
		setSelectedDays({});
		setRemoteData([]);
		if (props.apifor) {
			payload[apifor_id] = booking_id;
			bookingActions
				.getbookDate(payload, props.apifor)
				.then(function (response) {
					console.log("ressss", response);
					if (Array.isArray(response.data.data.data)) {
						let dArray = [];
						setRemoteData(response.data.data.data);
						setComments("");
						setBookingInit(false);
						let prevSelected = {};
						response.data.data.data.forEach((obj) => {
							let date = new Date(obj.date_of_booking);
							let mon = ("0" + (date.getMonth() + 1)).slice(-2);
							let year = date.getFullYear();
							if (mm == mon && yyyy == year) {
								let d = date.getDate();

								prevSelected[d] = obj.booking_status;
							}
						});
						setSelectedDays(prevSelected);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	}

	function bookDate() {
		let payload = {
			date_of_booking: formatDate(date),
			comment: comments,
			booking_status: bookingStatus,
		};

		if (Object.values(payload).length <= 0) {
			return;
		}
		if (props.apifor) {
			payload[apifor_id] = booking_id;
			bookingActions
				.bookDate(payload, props.apifor)
				.then(function (response) {
					console.log("ressss", response);
					if (response.data.data.id) {
						setRemoteData(remoteData.concat(response.data.data));
						setComments("");
						setBookingInit(false);
						let date = new Date(response.data.data.date_of_booking);
						let d = date.getDate();
						setSelectedDays({
							...selectedDays,
							[d]: response.data.data.booking_status,
						});
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	}

	const handleMonthChange = async (data) => {
		// just select random days to simulate server side based data
		console.log(data);
		getBookings(data);
	};

	const handleCommentChange = (event) => {
		setComments(event.target.value);
	};
	return (
		<Fragment>
			<Head>
				<title>Freelancer &nbsp; - Upload Images</title>
			</Head>
			<div className={classes.root}>
				<CssBaseline />

				<main>
					{/* Hero unit */}
					<div className={classes.heroContent}>
						<Grid container spacing={2}>
							<Grid item md={6} sm={6} xs={12}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										autoOk
										orientation={isMobile ? undefined : "landscape"}
										variant="static"
										openTo="date"
										value={date}
										onChange={changeDate}
										onMonthChange={handleMonthChange}
										renderDay={(
											day,
											selectedDate,
											isInCurrentMonth,
											dayComponent
										) => {
											const date = new Date(day); // skip this step, it is required to support date libs
											const selDays = Object.keys(selectedDays);

											const currentDay = date.getDate();
											const isSelected =
												isInCurrentMonth &&
												selDays.includes(currentDay.toString());

											// You can also use our internal <Day /> component
											return (
												<div
													className={isSelected && classes.booked}
													style={
														isSelected
															? selectedDays[date.getDate()] == 1
																? { backgroundColor: "#f6d55c" }
																: { backgroundColor: "#ed5538" }
															: undefined
													}
												>
													{dayComponent}
												</div>
											);
										}}
									/>
								</MuiPickersUtilsProvider>
								<br></br>
								<Button
									color="secondary"
									onClick={() => setBookingInit(!bookingInit)}
									variant="outlined"
								>
									{bookingInit ? "Close." : "Book Selected Date."}
								</Button>
							</Grid>
							<Grid item md={6} sm={6} xs={12}>
								{bookingInit && (
									<div>
										<Typography variant="h5">
											Booking Date: <b>{new Date(date).toDateString()}</b>
										</Typography>
										{bookingStatus == 1 ? (
											<div>
												<TextField
													type="text"
													onChange={handleCommentChange}
													variant="outlined"
													fullWidth
													multiline
													rows={4}
													label="Fill Availability Details"
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	disabled={
																		null == booking_id || null == bookingStatus
																	}
																	aria-label="book date"
																	onClick={bookDate}
																	edge="end"
																>
																	<SendIcon />
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
											</div>
										) : (
											<div>
												<TextField
													fullWidth
													select
													label="Choose a Reason"
													onChange={handleCommentChange}
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	disabled={
																		null == booking_id ||
																		null == bookingStatus ||
																		null == comments
																	}
																	aria-label="book date"
																	onClick={bookDate}
																	edge="end"
																>
																	<SendIcon />
																</IconButton>
															</InputAdornment>
														),
													}}
												>
													{partly.map((option) => (
														<MenuItem key={option} value={option}>
															{option}
														</MenuItem>
													))}
												</TextField>
											</div>
										)}

										<hr />

										<FormControl component="fieldset">
											<FormLabel component="legend">Booking Status</FormLabel>
											<RadioGroup
												aria-label="bookingStatus"
												name="bookingStatus"
												value={bookingStatus}
												onChange={handlebookingstatusChange}
												row
											>
												<FormControlLabel
													value="1"
													control={<Radio />}
													label="Partially"
													checked={bookingStatus == 1}
												/>
												<FormControlLabel
													value="0"
													control={<Radio />}
													label="Completely"
												/>
											</RadioGroup>
										</FormControl>
									</div>
								)}
								{!bookingInit && (
									<List className={classes.root}>
										{remoteData.map((data, index) => (
											<div key={index}>
												<ListItem alignItems="flex-start">
													<ListItemAvatar>
														<Avatar
															alt={new Date(data.date_of_booking).getDate()}
														/>
													</ListItemAvatar>
													<ListItemText
														primary={data.date_of_booking}
														secondary={
															<React.Fragment>
																<Typography
																	component="span"
																	variant="body2"
																	className={classes.inline}
																	color="textPrimary"
																>
																	Status :{" "}
																	{data.booking_status == 1
																		? "Partly"
																		: "Completely"}
																</Typography>
																<br></br>
																{data.comment}
															</React.Fragment>
														}
													/>
												</ListItem>
												<Divider variant="inset" component="li" />
											</div>
										))}
									</List>
								)}
							</Grid>
						</Grid>
					</div>
				</main>
			</div>
		</Fragment>
	);
};
export default withRouter(BookingModule);
