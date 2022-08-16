import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import CancelIcon from "@mui/icons-material/Cancel";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg";
import { ReactComponent as BlackHeartIcon } from "../../assets/icons/heart-black.svg";
import { ReactComponent as BlackHomeIcon } from "../../assets/icons/home-black.svg";
import { ReactComponent as BlackSearchPageIcon } from "../../assets/icons/searchPage-black.svg";
import { ReactComponent as SearchPageIcon } from "../../assets/icons/searchPage.svg";

import FavouriteDP from "../../assets/images/favourites.png";
import marsLogo from "../../assets/images/mars-logo.jpg";
import nasaLogo from "../../assets/images/nasa-logo.jpg";
import apodLogo from "../../assets/images/apod-logo.png";

import "../../styles/Header.scss";
import { Link, useLocation } from "react-router-dom";
import { HomeInfoComponentProps } from "../../pages/Home";

type Props = {};

const BottomNav = (props: Props) => {
	const location = useLocation();

	return (
		<nav className="bottom-nav">
			<div className="nav-wrapper">
				<div className="link">
					<Link to="/">
						{location.pathname === "/" ? <BlackHomeIcon /> : <HomeIcon />}
					</Link>
				</div>
				<div className="link">
					<Link to="/search">
						{location.pathname === "/search" ? (
							<BlackSearchPageIcon />
						) : (
							<SearchPageIcon />
						)}
					</Link>
				</div>
				<div className="link">
					<Link to="/favourites">
						{location.pathname === "/favourites" ? (
							<BlackHeartIcon />
						) : (
							<HeartIcon />
						)}
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default BottomNav;
