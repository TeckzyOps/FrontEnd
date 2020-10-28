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
} from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
	root: {},
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
	const [comments, setComments] = React.useState("");
	const [selectedDays, setSelectedDays] = React.useState([]);
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
	React.useEffect(() => {
		if (booking_id) {
			getBookings();
		}
	}, []);

	function getBookings(data) {
		let d = date;
		if (data) {
			d = data;
		}
		let mm = ("0" + (new Date(d).getMonth() + 1)).slice(-2);
		let yyyy = new Date(d).getFullYear();
		let payload = { month: mm, year: yyyy };
		setSelectedDays([]);
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
						response.data.data.data.forEach((obj) => {
							let date = new Date(obj.date_of_booking);
							let mon = ("0" + (date.getMonth() + 1)).slice(-2);
							let year = date.getFullYear();
							if (mm == mon && yyyy == year) {
								let d = date.getDate();
								dArray.push(d);
							}
						});
						setSelectedDays(dArray);
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
						setSelectedDays(selectedDays.concat(d));
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
											const isSelected =
												isInCurrentMonth &&
												selectedDays.includes(date.getDate());

											// You can also use our internal <Day /> component
											return (
												<div
													style={
														isSelected ? { backgroundColor: "grey" } : undefined
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
									<Grid item>
										<Typography variant="h5">
											Booking Date: <b>{new Date(date).toDateString()}</b>
										</Typography>
										<TextField
											type="text"
											onChange={handleCommentChange}
											variant="outlined"
											fullWidth
											multiline
											rows={4}
											label="Booking Description"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															disabled={null == booking_id}
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
									</Grid>
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
																	Status : "Booked"
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
