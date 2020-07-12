import React from "react";
import {
	Button,
	Grid,
	Slide,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	Dialog,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { fade, darken } from "@material-ui/core/styles/colorManipulator";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
} from "@material-ui/core/styles";
import { userActions } from "../../_actions/user.actions";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useTextAlign } from "~/theme/common";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	hide: {
		display: "none",
	},
	show: { display: "block" },
	input: {
		width: "100%",
		"& label": {
			left: theme.spacing(0.5),
		},
		"& > div": {
			overflow: "hidden",
			background:
				theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.1)" : "#eeeeee",
			"&:hover": {
				background: darken(theme.palette.background.paper, 0.1),
			},
			"& input, textarea": {
				paddingLeft: theme.spacing(2),
				"&:focus": {
					background: theme.palette.background.default,
				},
			},
		},
		"&$light": {
			"& label": {
				color: theme.palette.common.white,
			},
			"& > div": {
				border: `1px solid ${fade(theme.palette.primary.light, 0.5)}`,
				"& input": {
					color: theme.palette.common.white,
					"&:focus": {
						background: fade(theme.palette.text.hint, 0.2),
					},
					"&:hover": {
						background: fade(theme.palette.text.hint, 0.2),
					},
				},
			},
		},
	},
	btnArea: {
		marginTop: theme.spacing(5),
		"& button": {
			marginTop: theme.spacing(2),
		},
		"& span": {
			"& a": {
				textDecoration: "none !important",
				color:
					theme.palette.type === "dark"
						? theme.palette.primary.light
						: theme.palette.primary.dark,
			},
		},
		"&$flex": {
			display: "flex",
			justifyContent: "space-between",
			[theme.breakpoints.down("sm")]: {
				display: "block",
			},
		},
	},
}));

export default function OtpDialog({ isOpen, mobile }) {
	const [open, setOpen] = React.useState(false);
	const [showOTP, setOTP] = React.useState(false);
	const [values, setValues] = React.useState({
		otp: "",
		otpStatus: "",
	});
	const classes = useStyles();
	const router = useRouter();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const reqOtp = () => {
		setOTP(!showOTP);
		if (mobile) {
			userActions
				.sendOTP(mobile)
				.then(function (response) {
					console.log("ressss", response);
					setValues({
						...values,
						["otpStatus"]: "OTP Sent to Mobile: " + mobile + " ",
					});
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	};
	const verifyOtp = () => {
		if (mobile && values.otp) {
			userActions
				.verifyOTP(mobile, values.otp)
				.then(function (response) {
					console.log("ressss", response);
					router.push("/login");
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	return (
		<div>
			<Dialog
				open={isOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{"Mobile Verification"}
				</DialogTitle>

				<DialogContent>
					<Grid justify="center" container spacing={3}>
						<Grid item sm={12} xs={12} md>
							<div className={showOTP ? classes.hide : classes.show}>
								<Button
									variant="contained"
									onClick={reqOtp}
									fullWidth
									type="submit"
									color="secondary"
									size="large"
								>
									Request OTP to Verify Mobile!
								</Button>
								<Button
									variant="contained"
									fullWidth
									onClick={() => router.push("/login")}
									type="submit"
									color="secondary"
									size="large"
								>
									Skip For Now!
								</Button>
							</div>
							{values.otpStatus}
							<ValidatorForm
								className={showOTP ? classes.show : classes.hide}
								onError={(errors) => console.log(errors)}
								onSubmit={verifyOtp}
							>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<TextValidator
											variant="filled"
											className={classes.input}
											onChange={handleChange("otp")}
											value={values.otp}
											label="OTP"
											name="OTP"
											validators={["required"]}
											errorMessages={[
												"This field is required",
												"OTP is not valid",
											]}
										/>
									</Grid>
								</Grid>
								<div className={classes.btnArea}>
									<Button
										variant="contained"
										fullWidth
										type="submit"
										color="secondary"
										size="large"
									>
										Verify OTP
									</Button>
								</div>
							</ValidatorForm>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={handleClose} color="primary">
						Disagree
					</Button>
					<Button onClick={handleClose} color="primary">
						Agree
					</Button> */}
				</DialogActions>
			</Dialog>
		</div>
	);
}
