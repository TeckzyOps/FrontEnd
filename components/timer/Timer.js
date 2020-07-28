import React from "react";
import PropTypes from "prop-types";
import useStyles from "../Forms/form-style";
import Button from "@material-ui/core/Button";

function timer(props) {
	const OTP_TIMER = 15;
	const classes = useStyles();
	const [counter, setCounter] = React.useState(OTP_TIMER);
	const [counterid, setCounterid] = React.useState("");

	React.useEffect(() => {
		if (counter > 0) {
			setCounterid(setTimeout(() => setCounter(counter - 1), 1000));
		}
		return clearTimeout(counterid);
	}, [counter]);

	const resendClicked = () => {
		props.resendClicked();
	};

	return (
		<div className={classes.formHelper}>
			<Button
				size="small"
				onClick={resendClicked}
				disabled={counter > 0 ? true : false}
			>
				Resend OTP
			</Button>
			{counter}
		</div>
	);
}

export default timer;
