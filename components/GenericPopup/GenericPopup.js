import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import FormContainer from "../Forms/FormContainer";
import { blue } from "@material-ui/core/colors";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
	makeStyles,
	withStyles,
} from "@material-ui/core/styles";
import { useTextAlign } from "~/theme/common";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

function SimpleDialog(props) {
	const [open, setOpen] = React.useState(props.open);
	const formref = React.createRef();
	const handleClose = (value) => {
		setOpen(false);
		props.onClose();
	};
	const handleSubmit = (value) => {
		if (formref.current) {
			formref.current.submitForm();
		}
	};

	return (
		<Dialog aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				<MuiThemeProvider theme={theme}>
					<Typography variant="body1" component="h6">
						{props.title}
					</Typography>
				</MuiThemeProvider>
			</DialogTitle>
			<DialogContent dividers>
				<FormContainer
					ref={formref}
					elements={props.formElements}
					onSubmit={props.handleSubmit}
				/>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleSubmit} color="primary">
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	formElements: PropTypes.array.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default SimpleDialog;
