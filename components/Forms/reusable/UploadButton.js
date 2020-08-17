import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";

const styles = () => ({
	button: {
		color: "white",
		backgroundColor: "#0FCF7C",
		"&:hover": {
			backgroundColor: "#0ba562",
		},
	},
	input: {
		display: "none",
	},
});

const UploadButton = (props) => {
	const { classes, label, fileTypes, uploader } = props;

	const onChangeHandler = (event) => {
		uploader(event.target.files);
	};

	return (
		<div>
			<input
				accept={fileTypes.join(",")}
				className={classes.input}
				id="upload-button-file"
				multiple
				type="file"
				onChange={onChangeHandler}
			/>
			<label htmlFor="upload-button-file">
				<Button
					variant="contained"
					component="span"
					color="primary"
					className={classes.button}
					startIcon={<PublishIcon />}
				>
					{label}
				</Button>
			</label>
		</div>
	);
};

UploadButton.propTypes = {
	classes: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	fileTypes: PropTypes.array.isRequired,
	uploader: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadButton);
