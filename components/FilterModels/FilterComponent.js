import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FilterComponent = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<div className="d-flex ">
				<Button
					variant="outlined"
					className="ml-auto mr-4"
					color="primary"
					onClick={handleClickOpen}
				>
					{/* <IconButton aria-label="delete" disabled color="primary">
						<AddIcon />
					</IconButton> */}
					<Badge badgeContent={4} className="mr-2" color="secondary">
						<FilterListIcon />
					</Badge>
					Apply Filters
				</Button>
			</div>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Filters
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							Appply
						</Button>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem button>
						<ListItemText primary="MALE" secondary="RED	" />
					</ListItem>
					<Divider />
					<ListItem button>
						<ListItemText
							primary="Default notification ringtone"
							secondary="Tethys"
						/>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

export default FilterComponent;
