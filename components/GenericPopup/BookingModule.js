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
import { freelancerActions } from "../../_actions/freelancer.action";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}));

const BookingModule = ({ freelancer_id, ...props }) => {
	const classes = useStyles();
	const [img, setImg] = React.useState({});

	const [date, changeDate] = React.useState(new Date());
	const [remoteData, setRemoteData] = React.useState([]);
	const [remoteError, setRemoteError] = React.useState("");
	const [bookingInit, setBookingInit] = React.useState(false);
	const [comments, setComments] = React.useState("");
	const [selectedDays, setSelectedDays] = React.useState([]);

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
		getBookings();
	}, []);

	function getBookings() {
		let mm = ("0" + (new Date(date).getMonth() + 1)).slice(-2);
		let yyyy = new Date(date).getFullYear();
		setSelectedDays([]);
		freelancerActions
			.getbookDate({ freelancer_id: 1, month: mm, year: yyyy })
			.then(function (response) {
				console.log("ressss", response);
				if (Array.isArray(response.data.data.data)) {
					setRemoteData(response.data.data.data);
					response.data.data.data.forEach((obj) => {
						let date = new Date(obj.date_of_booking);
						let mon = ("0" + (date.getMonth() + 1)).slice(-2);
						let year = date.getFullYear();
						if (mm == mon && yyyy == year) {
							let d = date.getDate();
							setSelectedDays(selectedDays.concat(d));
						}
					});
				}
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
	}

	function bookDate() {
		let payload = {
			freelancer_id: 1,
			date_of_booking: formatDate(date),
			comment: comments,
		};
		if (Object.values(payload).length <= 0) {
			return;
		}
		freelancerActions
			.bookDate(payload)
			.then(function (response) {
				console.log("ressss", response);
			})
			.catch(function (error) {
				console.error("errrrr ", error);
			});
	}
	function getRandomNumber(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}
	const handleMonthChange = async () => {
		// just select random days to simulate server side based data
		getBookings();
		return new Promise((resolve) => {
			setTimeout(() => {
				setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
				resolve();
			}, 1000);
		});
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
							<Grid item md={6} sm={12}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										autoOk
										orientation="landscape"
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
								<Grid container justify="center" alignItems="center"></Grid>
							</Grid>
							<Grid item md={6} sm={12}>
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
							</Grid>
						</Grid>
					</div>
				</main>
			</div>
		</Fragment>
	);
};
export default BookingModule;
