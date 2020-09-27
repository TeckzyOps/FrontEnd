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
	CardActions,
	CardContent,
	CardMedia,
	CssBaseline,
} from "@material-ui/core";
import DashboardWrapper from "../../../components/Dashboard/DashboardWrapper";
import Head from "next/head";
import withAuth from "../../../components/Hoc/withAuth";
import LocalStorageService from "../../../_services/LocalStorageService";
const localStorageService = LocalStorageService.getService();
import Link from "@material-ui/core/Link";
import video_icon from "~/static/video_icon.svg";
import { freelancerActions } from "../../../_actions/freelancer.action";
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
}));

const FreelancerVid = (props) => {
	const classes = useStyles();
	const [img, setImg] = React.useState({});
	const [remoteData, setRemoteData] = React.useState([]);
	const [remoteError, setRemoteError] = React.useState("");

	React.useEffect(() => {
		getAllImages();
	}, []);

	function getAllImages() {
		freelancerActions
			.getMedia({ freelancer_id: 1, file_type: 1 })
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

	function submitImage() {
		let payload = new FormData();
		payload.append("image_file", vid.fileObj);
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

	return (
		<Fragment>
			<Head>
				<title>Freelancer &nbsp; - Upload Images</title>
			</Head>
			<DashboardWrapper logindata={props.logindata} userdata={props.userdata} />
			<div className={classes.root}>
				<CssBaseline />

				<main>
					{/* Hero unit */}
					<div className={classes.heroContent}>
						<Container maxWidth="sm">
							<div className={classes.heroButtons}>
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
										{vid.src && (
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
			</div>
		</Fragment>
	);
};
export default FreelancerVid;
