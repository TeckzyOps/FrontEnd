import React, { Fragment } from "react";
import Router from "next/router";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
	Grid,
	TextField,
	Container,
	Typography,
	Tooltip,
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
	CardMedia,
	CssBaseline,
	ButtonBase,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Header from "../../../components/Header";
import Head from "next/head";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import LocalStorageService from "../../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import Link from "@material-ui/core/Link";
import video_icon from "~/static/video_icon.svg";
import routerLink from "~/static/text/link";
import { b2bActions } from "../../../_actions/b2b.action";
import { withRouter } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles((theme) => ({
	root: { paddingTop: "11vh" },
	icon: {
		marginRight: theme.spacing(2),
	},
	input: {
		display: "none",
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
		border: "1px dotted grey",
	},
	image: {
		position: "relative",
		height: 200,
		[theme.breakpoints.down("xs")]: {
			width: "100% !important", // Overrides inline-style
			height: 100,
		},
		"&:hover, &$focusVisible": {
			zIndex: 1,
			"& $imageBackdrop": {
				opacity: 0.15,
			},
			"& $imageMarked": {
				opacity: 0,
			},
			"& $imageTitle": {
				border: "4px solid currentColor",
			},
		},
	},
	focusVisible: {},
	imageButton: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: theme.palette.common.white,
	},
	imageSrc: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: "cover",
		backgroundPosition: "center 40%",
	},
	imageBackdrop: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		opacity: 0.4,
		transition: theme.transitions.create("opacity"),
	},
	imageTitle: {
		position: "relative",
		padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
			theme.spacing(1) + 6
		}px`,
	},
	imageMarked: {
		height: 3,
		width: 18,
		backgroundColor: theme.palette.common.white,
		position: "absolute",
		bottom: -2,
		left: "calc(50% - 9px)",
		transition: theme.transitions.create("opacity"),
	},
}));

const B2bVid = (props) => {
	const classes = useStyles();
	const [vid, setVid] = React.useState({});
	const [remoteData, setRemoteData] = React.useState([]);
	const [remoteError, setRemoteError] = React.useState("");
	const [vidTitle, setVidTitle] = React.useState("");
	const [selectedVideo, setSelectedVideo] = React.useState({});
	const [open, setOpen] = React.useState(false);
	let textInput = React.useRef(null);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	React.useEffect(() => {
		console.log(props);
		getAllVideos();
	}, []);

	function getAllVideos() {
		textInput.current.value = null;
		b2bActions
			.getMedia({ b2b_id: props.router.query.id, file_type: 2 })
			.then(function (response) {
				console.log("ressss", response);
				if (Array.isArray(response.data.data)) {
					setRemoteData(response.data.data);
					setSelectedVideo(null);
					setVid(null);
				}
			})
			.catch(function (error) {
				if (error.response && error.response.data.input_error.image_file) {
					setRemoteError(error.response.data.input_error.image_file);
				}
				console.error("errrrr ", error);
			});
	}

	function playselected(filepath, title) {
		if (filepath && title) {
			setOpen(true);
			setSelectedVideo({
				src: filepath,
				title: title,
			});
		}
	}

	function submitVieo() {
		let payload = new FormData();
		payload.append("video_file", vid.fileObj);
		payload.append("b2b_id", props.router.query.id);
		payload.append("title", vidTitle);
		if (payload) {
			b2bActions
				.submitMedia(payload)
				.then(function (response) {
					console.log("ressss", response);
					getAllVideos();
					setSelectedVideo(null);
					setVid(null);
				})
				.catch(function (error) {
					if (error.response && error.response.data.input_error.image_file) {
						setRemoteError(error.response.data.input_error.image_file);
					}
					console.error("errrrr ", error);
				});
		}
	}

	return (
		<Fragment>
			<Head>
				<title>B2b &nbsp; - Upload Videos</title>
			</Head>
			<Header
				onToggleDark={props.onToggleDark}
				onToggleDir={props.onToggleDir}
			/>
			<div className={classes.root}>
				<CssBaseline />

				<main>
					{/* Hero unit */}
					<div className={classes.heroContent}>
						<Container maxWidth="sm">
							<div className={classes.heroButtons}>
								<Grid container spacing={2} justify="flex-start">
									<Grid item>
										<Link
											style={{ textDecoration: "none" }}
											href={
												routerLink.starter.b2bnew +
												"?id=" +
												props.router.query.id
											}
										>
											<IconButton
												color="primary"
												disabled={props.router.query.id == null}
											>
												<ArrowBackIcon />
											</IconButton>
										</Link>
									</Grid>
									{remoteError && (
										<Grid item>
											<Typography
												color="error"
												variant="subtitle1"
												component="h2"
											>
												Error : {remoteError}
											</Typography>
										</Grid>
									)}
								</Grid>
								<Grid container spacing={2} justify="center">
									<Grid container justify="center" alignItems="center">
										<Grid item>
											<TextField
												type="text"
												onChange={(e) => setVidTitle(e.target.value)}
												variant="outlined"
												fullWidth
												label="Video Title"
												inputRef={textInput}
											/>
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
													setRemoteError("");
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
											disabled={vid == null || vid.src == null}
											variant="outlined"
											color="primary"
										>
											Upload It!
										</Button>
									</Grid>
									<Grid item xs={12}>
										{vid != null && vid.src && (
											<table
												style={{
													borderCollapse: "collapse",
													borderSpacing: 0,
													width: "100%",
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
					<br></br>
					<Container className={classes.cardGrid} maxWidth="md">
						{/* End hero unit */}
						<Grid container spacing={2}>
							{remoteData.map((card, index) => (
								<Grid key={index} item xs={12} sm={6} md={4}>
									<ButtonBase
										onClick={() => playselected(card.file_path, card.title)}
										focusRipple
										className={classes.image}
										focusVisibleClassName={classes.focusVisible}
										style={{
											width: "300px",
										}}
									>
										<span className={classes.imageSrc}>
											<video
												width="100%"
												src={card.file_path}
												playsInline="playsinline"
												muted="muted"
												loop="loop"
												autoPlay={false}
												controls={false}
											/>
										</span>
										<span className={classes.imageBackdrop} />
										<span className={classes.imageButton}>
											<Typography
												component="span"
												variant="subtitle1"
												color="inherit"
												className={classes.imageTitle}
											>
												{card.title}
												<span className={classes.imageMarked} />
											</Typography>
										</span>
									</ButtonBase>
								</Grid>
							))}
						</Grid>
					</Container>
				</main>
				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby={selectedVideo && selectedVideo.title}
				>
					<DialogTitle
						id={selectedVideo && selectedVideo.title}
						onClose={() => setOpen(false)}
					>
						<Typography variant="h6">
							{selectedVideo && selectedVideo.title}
						</Typography>
						<IconButton
							aria-label="close"
							className={classes.closeButton}
							onClick={() => setOpen(false)}
						>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent>
						<video
							width="100%"
							src={selectedVideo && selectedVideo.src}
							muted="muted"
							loop="loop"
							autoPlay={false}
							controls={true}
						/>
					</DialogContent>
				</Dialog>
			</div>
		</Fragment>
	);
};

export default withRouter(B2bVid);
