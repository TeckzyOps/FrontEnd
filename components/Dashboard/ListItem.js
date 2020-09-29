import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
// import Link from "next/link";
import routerLink from "~/static/text/link";
import worker from "~/static/images/worker.svg";
import seller from "~/static/images/seller.svg";
import vendor from "~/static/images/vendor.svg";
import couple from "~/static/couple.svg";
import outsourcing from "~/static/outsourcing.svg";
import Link from "@material-ui/core/Link";

import CardMembershipIcon from "@material-ui/icons/CardMembership";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SettingsIcon from "@material-ui/icons/Settings";
import StoreIcon from "@material-ui/icons/Store";
import HelpIcon from "@material-ui/icons/Help";

export const mainListItems = (
	<div>
		<ListItem component={Link} href={routerLink.starter.dashboard} button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.matrimony} button>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Matrimony" />
		</ListItem>

		<ListItem component={Link} href={routerLink.starter.freelancer} button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Freelancer" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.profile} button>
			<ListItemIcon>
				<AccountCircle />
			</ListItemIcon>
			<ListItemText primary="Profile" />
		</ListItem>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Services</ListSubheader>
		<ListItem component={Link} href={routerLink.starter.worker} button>
			<ListItemIcon>
				<HelpIcon />
			</ListItemIcon>
			<ListItemText primary="Workers" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.vendor} button>
			<ListItemIcon>
				<StoreIcon />
			</ListItemIcon>
			<ListItemText primary="Vendors" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.seller} button>
			<ListItemIcon>
				<StoreIcon />
			</ListItemIcon>
			<ListItemText primary="Seller" />
		</ListItem>
		<ListItem component={Link} href={routerLink.starter.b2b} button>
			<ListItemIcon>
				<StoreIcon />
			</ListItemIcon>
			<ListItemText primary="B2B" />
		</ListItem>
	</div>
);
