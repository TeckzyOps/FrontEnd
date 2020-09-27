import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, TextField, Typography, Tooltip } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MovieIcon from "@material-ui/icons/Movie";
import Link from "@material-ui/core/Link";
import video_icon from "~/static/video_icon.svg";

import { freelancerActions } from "../../_actions/freelancer.action";

const useStyles = makeStyles((theme) => ({
	input: {
		display: "none",
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	cardMedia: {
		paddingTop: "56.25%", // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function FreelancerVideo({ freelancer_id, ...props }) {
	const classes = useStyles();
	const [vid, setVid] = React.useState({});
	const [remoteData, setRemoteData] = React.useState([]);
	const [remoteError, setRemoteError] = React.useState("");
	const [vidTitle, setVidTitle] = React.useState("");

	const useStylesBootstrap = makeStyles((theme) => ({
		arrow: {
			color: theme.palette.common.black,
		},
		tooltip: {
			backgroundColor: theme.palette.common.black,
		},
	}));

	function BootstrapTooltip(props) {
		const classes = useStylesBootstrap();
		return <Tooltip arrow classes={classes} {...props} />;
	}

	React.useEffect(() => {
		getAllVideos();
	}, []);

	function getAllVideos() {
		freelancerActions
			.getMedia({ freelancer_id: 1, file_type: 2 })
			.then(function (response) {
				console.log("ressss", response);
				if (Array.isArray(response.data.data)) {
					setRemoteData(response.data.data);
				}
			})
			.catch(function (error) {
				if (error.response && error.response.data.input_error) {
					Object.keys(error.response.data.input_error).forEach((k) => {
						setFieldError(k, error.response.data.input_error[k][0]);
					});
				}
				console.error("errrrr ", error);
			});
	}

	function submitVieo() {
		let payload = new FormData();
		payload.append("video_file", vid.fileObj);
		payload.append("freelancer_id", 1);
		payload.append("title", vidTitle);
		if (payload) {
			freelancerActions
				.submitMedia(payload)
				.then(function (response) {
					console.log("ressss", response);
					getAllVideos();
				})
				.catch(function (error) {
					if (error.response && error.response.data.input_error) {
						Object.keys(error.response.data.input_error).forEach((k) => {
							setFieldError(k, error.response.data.input_error[k][0]);
						});
					}
					console.error("errrrr ", error);
				});
		}
	}
	function videoplayer(src) {
		return (
			<video
				key={src}
				width="100%"
				onClick={playvid}
				crossOrigin="anonymous"
				muted="muted"
				loop="loop"
				controls={true}
				src={src}
				// onClick={handlePlay.bind(this)}
			/>
		);
	}
	const _handleTextFieldChange = (e) => {
		setVidTitle(e.target.value);
	};
	return (
		<React.Fragment>
			<CssBaseline />

			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid container justify="center" alignItems="center">
									<Grid item>
										<Typography variant="h6">Video Title</Typography>
										<TextField type="text" onChange={(e)=>setVidTitle(e.target.value)} variant="outlined" fullWidth label="Video Title">
									</Grid>
								</Grid>
								<Grid item>
									<input
										accept="video/*"
										className={classes.input}
										id="contained-button-file"
										onChange={(event) => {
											let reader = new FileReader();
											let file = event.currentTarget.files[0];
											var fileUrl = URL.createObjectURL(file);

											if (file) {
												reader.readAsDataURL(file);
												reader.onloadend = () => {
													var blob = new Blob([reader.result], {
														type: file.type,
													});
													var url = URL.createObjectURL(blob);
													setVid({
														src: url,
														fileObj: file,
														name: file.name,
														type: file.type,
														size: (file.size / (1024 * 1024)).toFixed(2),
													});
												};
											}
										}}
										type="file"
									/>
									<label htmlFor="contained-button-file">
										<Button
											variant="contained"
											color="primary"
											component="span"
										>
											Choose Video
										</Button>
									</label>
								</Grid>
								<Grid item>
									<Button
										onClick={submitVieo}
										disabled={vid.src == null}
										variant="outlined"
										color="primary"
									>
										Upload It!
									</Button>
								</Grid>
								<Grid item xs={12}>
									{vid.src && (
										<table
											style={{
												borderCollapse: "collapse",
												borderSpacing: 0,
												width: "100%",
												border: "1px solid #ddd",
											}}
										>
											<thead>
												<tr>
													<th>File Name</th>
													<th>File Type</th>
													<th>File Size</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>{vid.name}</td>
													<td>{vid.type}</td>
													<td>{vid.size ? vid.size + "MB" : ""}</td>
												</tr>
											</tbody>
										</table>
									)}
									<div></div>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{remoteData.map((card) => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										image={video_icon}
										className={classes.cardMedia}
										title={card.title}
									></CardMedia>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											{card.title || "Title"}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary">
											View
										</Button>
										<Button size="small" color="primary">
											Delete
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Footer
				</Typography>
				<Typography
					variant="subtitle1"
					align="center"
					color="textSecondary"
					component="p"
				>
					Something here to give the footer a purpose!
				</Typography>
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}
