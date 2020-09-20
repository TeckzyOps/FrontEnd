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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Switch from "@material-ui/core/Switch";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import profile from "~/static/profile.png";
import {
	gender,
	education,
	occupation,
	idType,
	religion,
	maritialStatus,
	caste,
	experience,
	countryList,
	interest,
	languages,
} from "~static/text/profiledata";
import { Grid } from "@material-ui/core";
import {
	createMuiTheme,
	responsiveFontSizes,
	MuiThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	details: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flex: "1 0 auto",
	},
	cover: {
		width: 250,
		height: 200,
	},
	controls: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	avatar: {
		backgroundColor: red[500],
	},
	manglikEnabled: {
		backgroundColor: theme.palette.primary,
	},
}));
const MatrimonyProfile = (props) => {
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true,
	});
	const toTitleCase = (s) => {
		if (typeof s === "string" && s.length > 0) {
			const words = s.split(" ");
			if (Array.isArray(words) && words.length > 0) {
				if (words.length === 1) {
					const word = words[0];
					const matches = word.charAt(0).match(/\w+/i);
					const lines = word.split("\n");
					if (Array.isArray(lines) && lines.length > 1) {
						return lines
							.map((line) => {
								return toTitleCase(line);
							})
							.join("\n");
					} else if (Array.isArray(matches)) {
						return word
							.split("")
							.map((c, i) => {
								if (i === 0) {
									return c.toUpperCase();
								}
								return c.toLowerCase();
							})
							.join("");
					} else {
						return word.charAt(0).concat(toTitleCase(word.slice(1)));
					}
				} else {
					return words.map((word) => toTitleCase(word)).join(" ");
				}
			}
		}
		return "";
	};
	const classes = useStyles();
	const [data, setdata] = React.useState({
		pictures: {
			path: {
				one: null,
				six: null,
				two: null,
				five: null,
				four: null,
				three: null,
			},
			status: 0,
		},
		name: "",
		gender: -1,
		dob_year: 0,
		height: 0,
		religion: "",
		cast: "",
		marital_status: "",
		manglik_status: "",
	});
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	const [expanded, setExpanded] = React.useState(false);
	React.useEffect(() => {
		setdata(props.ad);
	}, []);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<Card className={classes.root}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Grid container>
						<Grid sm={12}>
							<Typography component="h5" variant="h5">
								{data.name}
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								{maritialStatus[parseInt(data.marital_status) - 1] +
									" | " +
									data.height +
									'"'}
							</Typography>
						</Grid>
						{["religion", "cast", "proffesion", "salary"].map((attr, index) => (
							<Grid item sm={6}>
								<MuiThemeProvider theme={theme}>
									<Typography variant="subtitle2">
										{toTitleCase(attr)} :{data[attr]}
									</Typography>
								</MuiThemeProvider>
							</Grid>
						))}
					</Grid>
				</CardContent>
				<div className={classes.controls}>
					Manglik
					<Switch
						checked={data.manglik_status == "true"}
						style={data.manglik_status == "true" ? { color: "blue" } : {}}
						disabled
						onChange={handleChange}
						name="checkedA"
						inputProps={{ "aria-label": "secondary checkbox" }}
					/>
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
				</div>
			</div>
			<CardMedia
				className={classes.cover}
				image={data.pictures.path.one || profile}
				// image={Object.values(data.pictures.path).forEach((dp) => {
				// 	return dp != null ? dp : "";
				// })}
				title={data.name}
			/>
		</Card>
	);
};

export default MatrimonyProfile;
