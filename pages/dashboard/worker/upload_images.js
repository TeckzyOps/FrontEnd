import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	TextField,
	Container,
	Typography,
	Tooltip,
	Button,
	Card,
	IconButton,
	Divider,
	CardActions,
	CardContent,
	CardMedia,
	CssBaseline,
	ButtonBase,
} from "@material-ui/core";
import Dashboard from "../../../components/Dashboard/DashboardWrap";
import Head from "next/head";
import withAuth from "../../../components/Hoc/withAuth";
import LocalStorageService from "../../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router";
import routerLink from "~/static/text/link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { workerActions } from "../../../_actions/worker.action";
import CloseIcon from "@material-ui/icons/Close";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	input: {
		display: "none",
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
		border: "1px dotted grey",
	},
	heroButtons: {
		marginTop: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
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
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${
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

const workerImg = (props) => {
	const classes = useStyles();
	const [img, setImg] = React.useState({});
	const [remoteData, setRemoteData] = React.useState([]);
	const [remoteError, setRemoteError] = React.useState("");
	const [selectedImg, setSelectedImg] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();

	React.useEffect(() => {
		getAllImages();
	}, []);
	function GetFilename(url) {
		if (url) {
			var m = url.toString().match(/.*\/(.+?)\./);
			if (m && m.length > 1) {
				return m[1];
			}
		}
		return "";
	}
	function getAllImages() {
		workerActions
			.getMedia({ worker_id: props.router.query.id, file_type: 1 })
			.then(function (response) {
				console.log("ressss", response);
				if (Array.isArray(response.data.data)) {
					setRemoteData(response.data.data);
				}
			})
			.catch(function (error) {
				if (error.response && error.response.data.input_error.image_file) {
					setRemoteError(error.response.data.input_error.image_file);
				}
				console.error("errrrr ", error);
			});
	}

	function submitImage() {
		let payload = new FormData();
		payload.append("image_file", img.fileObj);
		payload.append("worker_id", props.router.query.id);
		if (payload) {
			workerActions
				.submitMedia(payload)
				.then(function (response) {
					console.log("ressss", response);
					getAllImages();
				})
				.catch(function (error) {
					if (error.response && error.response.data.input_error.image_file) {
						setRemoteError(error.response.data.input_error.image_file);
					}
					console.error("errrrr ", error);
				});
		}
	}
	function openSelected(img) {
		setSelectedImg(img);
		setOpen(true);
	}

	return (
		<Fragment>
			<Head>
				<title>Worker &nbsp; - Upload Images</title>
			</Head>
			<Dashboard>
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
													routerLink.starter.workerDetails +
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
										<Grid item>
											<input
												accept="image/*"
												className={classes.input}
												id="contained-button-file"
												onChange={(event) => {
													let reader = new FileReader();
													let file = event.currentTarget.files[0];

													if (file) {
														setRemoteError("");
														reader.readAsDataURL(file);
														reader.onloadend = () => {
															var blob = new Blob([reader.result], {
																type: file.type,
															});
															var url = URL.createObjectURL(blob);
															setImg({
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
													Choose An Image
												</Button>
											</label>
										</Grid>
										<Grid item>
											<Button
												onClick={submitImage}
												disabled={img.src == null}
												variant="outlined"
												color="primary"
											>
												Upload It!
											</Button>
										</Grid>
										<Grid item xs={12}>
											{img.src && (
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
															<td>{img.name}</td>
															<td>{img.type}</td>
															<td>{img.size ? img.size + "MB" : ""}</td>
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
						<Divider />
						<br></br>
						<Container className={classes.cardGrid} maxWidth="md">
							{/* End hero unit */}
							<Grid container spacing={1}>
								{remoteData.map((card) => (
									<Grid item key={card} xs={12} sm={4} md={4}>
										<ButtonBase
											onClick={() => openSelected(card.file_path)}
											focusRipple
											className={classes.image}
											focusVisibleClassName={classes.focusVisible}
											style={{
												width: "230px",
												height: "250px",
											}}
										>
											<span
												className={classes.imageSrc}
												style={{
													backgroundImage: `url(${card.file_path})`,
												}}
											/>
											<span className={classes.imageBackdrop} />
											<span className={classes.imageButton}>
												<Typography
													component="span"
													variant="subtitle1"
													color="inherit"
													className={classes.imageTitle}
												>
													{GetFilename(card.file_path)}
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
						open={open}
						onClose={() => setOpen(false)}
						aria-labelledby={selectedImg}
					>
						<DialogTitle onClose={() => setOpen(false)}>
							<Typography variant="h6">{GetFilename(selectedImg)}</Typography>
							<IconButton
								aria-label="close"
								className={classes.closeButton}
								onClick={() => setOpen(false)}
							>
								<CloseIcon />
							</IconButton>
						</DialogTitle>
						<DialogContent>
							<img width="100%" src={selectedImg} height="100%" />
						</DialogContent>
					</Dialog>
				</div>
			</Dashboard>
		</Fragment>
	);
};
export default withRouter(workerImg);
