import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Scrollspy from "react-scrollspy";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowUpward";
import Tooltip from "@material-ui/core/Tooltip";
import { withTranslation } from "~/i18n";
import navMenu from "../Header/menu";
import useStyles from "./pagenav-style";

function createData(id, name, url) {
	return {
		name,
		url,
	};
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
	// eslint-disable-line
	return <AnchorLink to={props.to} {...props} />; // eslint-disable-line
});

function PageNav(props) {
	const { t } = props;
	const [show, setShow] = useState(false);
	let flagShow = false;

	const handleScroll = () => {
		const doc = document.documentElement;
		const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		const newFlagShow = scroll > 500;
		if (flagShow !== newFlagShow) {
			setShow(newFlagShow);
			flagShow = newFlagShow;
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, []);
	const classes = useStyles();
	const [menuList] = useState([
		createData(navMenu[0].name, navMenu[0].link),
		createData(navMenu[1].name, navMenu[1].link),
		createData(navMenu[2].name, navMenu[2].link),
		createData(navMenu[3].name, navMenu[3].link),
		createData(navMenu[4].name, navMenu[4].link),
		createData(navMenu[5].name, navMenu[5].link),
	]);
	return (
		<div className={clsx(classes.pageNav, show && classes.show)}>
			<Tooltip
				title="To Top"
				placement="left"
				classes={{
					tooltip: classes.tooltip,
				}}
			>
				<Fab
					color="primary"
					aria-label="To top"
					component={LinkBtn}
					href="#home"
					className={classes.fab}
				>
					<ArrowIcon />
				</Fab>
			</Tooltip>
			<nav className={classes.sectionNav}>
				<Scrollspy items={navMenu} currentClassName="active">
					{menuList.map((item, index) => (
						<li
							key={(index + 1).toString()}
							style={{ top: 30 * (navMenu.length - (index + 1)) }}
							data-id={index + 1}
						>
							<Tooltip
								title={t("starter-landing:header_" + item.name)}
								placement="left"
								classes={{
									tooltip: classes.tooltip,
								}}
							>
								<AnchorLink href={item.url} />
							</Tooltip>
						</li>
					))}
				</Scrollspy>
			</nav>
		</div>
	);
}

PageNav.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation(["starter-landing"])(PageNav);
