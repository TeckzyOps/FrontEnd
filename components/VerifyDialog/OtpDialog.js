import useStyles from "../Forms/form-style";
import React, { useState, useEffect } from "react";
import Snackbar from "../VerifyDialog/Snackbar";
import { userActions } from "../../_actions/user.actions";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withTranslation } from "~/i18n";
import { useRouter } from "next/router";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";

function otpdialog(props) {
	const OTP_TIMER = 15;
	const classes = useStyles();
	const router = useRouter();
	let btnRef = React.useRef();
	const [snackbar, showsnackbar] = useState(false);
	const { t } = props;
	const [counter, setCounter] = useState(OTP_TIMER);
	const [values, setValues] = useState({
		mobile: props.mobile,
		otp: "",
		error: "",
		intervalid: "",
	});

	useEffect(() => {
		reqOtp();
	}, []);

	// useEffect(() => {
	// 	console.log("trigger use effect hook");

	// 	setTimeout(() => {
	// 		reqOtp;
	// 	}, 1000);
	// }, [values.otpTimer]);
	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
	}, [counter]);

	const reqOtp = () => {
		setCounter(OTP_TIMER);
		if (values.mobile) {
			decrementClock();
			userActions
				.sendOTP(values.mobile)
				.then(function (response) {
					console.log("ressss", response);
					setValues({
						...values,
						["otpStatus"]: "OTP Sent to Mobile: " + values.mobile,
					});
					setValues({
						...values,
						["otp"]: response.data.otp,
					});
				})
				.catch(function (error) {
					console.error(error);
					setValues({ ...values, ["error"]: error.response.data.message });
					showsnackbar(true);
				});
		}
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	const decrementClock = () => {
		setValues({
			otpTimer: values.otpTimer - 1,
		});
		if (btnRef.current) {
			btnRef.current.setAttribute("disabled", "disabled");
		}

		if (values.otpTimer <= 0) {
			clearInterval(values.intervalid);
			setValues({
				otpTimer: 15,
			});
			btnRef.current.removeAttribute("disabled");
		}
	};
	const verifyOtp = () => {
		if (values.mobile && values.otp) {
			userActions
				.verifyOTP(values.mobile, values.otp)
				.then(function (response) {
					console.log("ressss", response);
					router.push("/login");
				})
				.catch(function (error) {
					console.error(error);
					setValues({ ...values, ["error"]: error.response.data.message });
					showsnackbar(true);
				});
		}
	};

	return (
		<div>
			<Snackbar
				isOpen={snackbar}
				message={values.error}
				close={() => showsnackbar(false)}
			/>
			<ValidatorForm
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
							errorMessages={["This field is required", "OTP is not valid"]}
						/>
					</Grid>
				</Grid>
				<div className={classes.formHelper}>
					<Button
						size="small"
						className={classes}
						ref={btnRef}
						onClick={reqOtp}
						disabled={counter ? true : false}
					>
						Resend OTP
					</Button>
					<p>{counter}</p>
				</div>
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
		</div>
	);
}

otpdialog.propTypes = {
	mobile: PropTypes.string.isRequired,
};
export default withTranslation(["common"])(otpdialog);
