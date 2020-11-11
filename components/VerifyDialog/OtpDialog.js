import useStyles from "../Forms/form-style";
import React, { useState, useEffect } from "react";
import Snackbar from "../VerifyDialog/Snackbar";
import { userActions } from "../../_actions/user.actions";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withTranslation } from "~/i18n";
import { useRouter } from "next/router";
import { Grid, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import FormContainer from "../Forms/FormContainer";
import { userVerificationForm } from "../../static/FormData/userVerificationForm";
import Alert from "./../../components/alert/alert";

function otpdialog(props) {
	const OTP_TIMER = 15;
	const classes = useStyles();
	const router = useRouter();
	let btnRef = React.useRef();
	const { t } = props;
	const [MessagePopup, setMessagePopup] = useState(false);
	const [Message, setMessage] = useState("");
	const [counter, setCounter] = useState(OTP_TIMER);
	const [values, setValues] = useState({
		username: props.username,
		otp: "",
		error: "",
		intervalid: "",
	});

	useEffect(() => {
		reqOtp();
	}, []);

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
	}, [counter]);

	const reqOtp = () => {
		setCounter(OTP_TIMER);
		if (values.username) {
			decrementClock();
			userActions
				.sendOTP(values.username)
				.then(function (response) {
					console.log("ressss", response);
					if (response.status == 201) {
						setValues({
							...values,
							["otpStatus"]: "OTP Sent to Mobile: " + values.mobile,
						});
						setValues({
							...values,
							["otp"]: response.data.otp,
						});
					} else {
						setMessage("Something Went Wrong!");
						setMessagePopup(true);
					}
				})
				.catch(function (error) {
					console.error(error);
					setMessage("Something Went Wrong!");
					setMessagePopup(true);
				});
		}
	};
	const _renderModal = () => {
		const onClick = () => {
			setMessagePopup(() => false);
			window.location.reload(false);
		};

		return (
			<Alert
				isOpen={MessagePopup}
				handleSubmit={onClick}
				title="Process Status"
				text={Message}
				submitButtonText="Ok."
			/>
		);
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
	const verifyOtp = ({ values }) => {
		if (values.username && values.otp) {
			userActions
				.verifyOTP(values.username, values.otp)
				.then(function (response) {
					console.log("ressss", response);
					if (response.data.otp_verification_status) {
						if (props.doClose) {
							props.doClose();
						}

						router.push("/login");
					}
				})
				.catch(function (error) {
					console.error(error);
					setMessage("Something Went Wrong!");
					setMessagePopup(true);
				});
		}
	};
	const btn = { label: "Verify OTP" };
	return (
		<div>
			<FormContainer
				elements={props.formData ? props.formData : userVerificationForm}
				btn={btn}
				defaultvals={{ otp: values.otp, username: values.username }}
				helperEle={() => (
					<div className={classes.formHelper}>
						<Button
							size="small"
							ref={btnRef}
							onClick={reqOtp}
							disabled={counter ? true : false}
						>
							Resend OTP
						</Button>
						<p>{counter}</p>
					</div>
				)}
				onSubmit={verifyOtp}
			/>
			{/* <ValidatorForm
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
			</ValidatorForm> */}
			{_renderModal()}
		</div>
	);
}

otpdialog.propTypes = {
	username: PropTypes.string,
	formData: PropTypes.array,
	doClose: PropTypes.func,
};
export default withTranslation(["common"])(otpdialog);
