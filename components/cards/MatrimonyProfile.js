import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Switch from "@material-ui/core/Switch";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		backgroundColor: red[500],
	},
}));
const MatrimonyProfile = (props) => {
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
	});

	const classes = useStyles();
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<>
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							T
						</Avatar>
					}
					// action={
					// 	<IconButton aria-label="settings">
					// 		<MoreVertIcon />
					// 	</IconButton>
					// }
					title="Tusar Seth"
					subheader="September 14, 2016"
				/>
				<CardMedia
					className={classes.media}
					image="/static/images/cards/paella.jpg"
					title="Paella dish"
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						Short Descrption of Layout kjl;jhj asjdhaskd asjkdhasjkdhka
						asjkdhasjkdhsakjdhasjkdhsa asdkjhjasdhkj
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<Switch
							checked={state.checkedA}
							onChange={handleChange}
							name="checkedA"
							inputProps={{ "aria-label": "secondary checkbox" }}
						/>
					</IconButton>
					<IconButton aria-label="delete">
						<DeleteForeverIcon></DeleteForeverIcon>
					</IconButton>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Full Details:</Typography>

						<Typography>All Profile Details</Typography>
					</CardContent>
				</Collapse>
			</Card>
		</>
	);
};

export default MatrimonyProfile;