import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import SimpleDialog from "../GenericPopup/GenericPopup";
import { profileActions } from "../../_actions/profile.action";
import {
	Card,
	CardActions,
	CardContent,
	Avatar,
	Typography,
	Divider,
	Button,
	LinearProgress,
} from "@material-ui/core";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
} from "@material-ui/core/styles";
import { useTextAlign } from "~/theme/common";
import { mpinForm } from "~/static/FormData/mpinForm";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
	root: {},
	details: {
		display: "flex",
	},
	avatar: {
		marginLeft: "auto",
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
	},
	progress: {
		marginTop: theme.spacing(2),
	},
	uploadButton: {
		marginRight: theme.spacing(2),
	},
}));

const AccountProfile = (props) => {
	const { className, ...rest } = props;
	const [openmpin, setmpinOpen] = React.useState(false);

	const classes = useStyles();
	const handlempinOpen = () => {
		setmpinOpen(true);
	};
	const handlempinsubmit = (values, setError) => {
		if (values.mpin && values.password) {
			profileActions
				.changeMPIN(values.mpin, values.password)
				.then(function (response) {
					console.log("ressss", response);
					if (response.data.input_error) {
						setError(response.data.input_error);
					} else {
						setmpinOpen(false);
					}
				})
				.catch(function (error) {
					console.error("errrrr ", error);
				});
		}
	};

	const user = {
		name: "Akash Singh",
		city: "Goarkhpur",
		country: "India",
		timezone: "GTM-7",
		avatar: "/images/avatars/avatar_11.png",
		email: "teckzy.inc@gmail.com",
		mobile: "7054796555",
	};
	const handlempinClose = () => {
		setmpinOpen(false);
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			{openmpin && (
				<SimpleDialog
					onClose={handlempinClose}
					title="Change/Update M-PIN"
					open={openmpin}
					formElements={mpinForm}
					handleSubmit={handlempinsubmit}
				/>
			)}

			<div>
				<CardContent>
					<div className={classes.details}>
						<div>
							<Typography gutterBottom variant="h6">
								{user.name}
							</Typography>
							<Typography
								className={classes.locationText}
								color="textSecondary"
								variant="body1"
							>
								{user.city}, {user.country}
							</Typography>
							<Typography
								className={classes.dateText}
								color="textSecondary"
								variant="body1"
							>
								{moment().format("hh:mm A")} ({user.timezone})
							</Typography>
						</div>
						<Avatar className={classes.avatar} src={user.avatar} />
					</div>
					<div className={classes.progress}>
						<Typography variant="body1">Profile Completeness: 70%</Typography>
						<LinearProgress value={70} variant="determinate" />
					</div>
				</CardContent>
				<Divider />
				<CardActions>
					<Button
						className={classes.uploadButton}
						color="primary"
						variant="text"
					>
						<MuiThemeProvider theme={theme}>
							<Typography variant="button">Upload Picture</Typography>
						</MuiThemeProvider>
					</Button>
					<Button onClick={handlempinOpen} variant="text">
						<MuiThemeProvider theme={theme}>
							<Typography variant="button">Generate MPIN</Typography>
						</MuiThemeProvider>
					</Button>
					<Link href="changepassword">
						<Button variant="text">
							<MuiThemeProvider theme={theme}>
								<Typography variant="button">Change Password</Typography>
							</MuiThemeProvider>
						</Button>
					</Link>
				</CardActions>
			</div>
		</Card>
	);
};

AccountProfile.propTypes = {
	className: PropTypes.string,
};

export default AccountProfile;
