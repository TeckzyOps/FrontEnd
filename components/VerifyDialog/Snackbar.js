import React from "react";
import PropTypes from "prop-types";
import { Slide } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { withTranslation } from "~/i18n";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

function snackbar(props) {
	const [open, setOpen] = React.useState(true);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		props.close();
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<Snackbar
			autoHideDuration={4000}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={props.isOpen}
			TransitionComponent={Slide}
			message={props.message}
			onClose={handleClose}
			action={
				<React.Fragment>
					<IconButton
						size="small"
						aria-label="close"
						color="inherit"
						onClick={handleClose}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				</React.Fragment>
			}
		/>
	);
}

snackbar.propTypes = {
	message: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
};

export default withTranslation(["common"])(snackbar);
