import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import CancelIcon from "@mui/icons-material/Cancel";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg";
import { ReactComponent as BlackHeartIcon } from "../../assets/icons/heart-black.svg";
import { ReactComponent as BlackHomeIcon } from "../../assets/icons/home-black.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import FavouriteDP from "../../assets/images/favourites.png";
import marsLogo from "../../assets/images/mars-logo.jpg";
import nasaLogo from "../../assets/images/nasa-logo.jpg";
import apodLogo from "../../assets/images/apod-logo.png";

import "../../styles/Header.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { HomeInfoComponentProps } from "../../pages/Home";
import { accountType } from "../../features/homeSlice";

type Props = {};
type LocationType = {
	pathname: string;
};
const Header = (props: Props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchStr, setSearchStr] = useState<string>("");
	const params = useParams<{ account: accountType; post: string }>();
	const [searchArray, setSearchArray] = useState<HomeInfoComponentProps[]>([
		{
			src: FavouriteDP,
			size: "normal",
			title: "favourites",
			desc: "See your liked photos",
			action: ["View", "/"],
		},
		{
			src: apodLogo,
			size: "normal",
			title: "apod",
			desc: "Astronomy Picture of the Day",
			action: ["View", "/"],
		},
		{
			src: marsLogo,
			size: "normal",
			title: "mars_rover",
			desc: "Mars Rover Photos",
			action: ["View", "/"],
		},
		{
			src: nasaLogo,
			size: "normal",
			title: "nasa_img",
			desc: "NASA Images",
			action: ["View", "/"],
		},
	]);

	console.log("location", location.pathname.split("/"));

	return (
		<header className="header">
			<div className="header-wrapper">
				<div className="backBtn">
					<button onClick={() => navigate(-1)}>
						{location.pathname !== "/" ? <ArrowBackIosNewIcon /> : ""}
					</button>
				</div>
				<div className="logo">
					<Link to="/">
						<img src={logo} alt="logo" />
					</Link>
					{location.pathname !== "/" ? (
						<div className="page">
							<h1>
								{location.pathname.split("/")[2]
									? "Photo"
									: location.pathname.split("/")[1]
									? location.pathname.split("/")[1]
									: "Error"}
							</h1>
						</div>
					) : (
						""
					)}
				</div>
				<div className="search-container">
					<div className="trigger">
						<div className="search-icon">
							<SearchIcon />
						</div>
						<input
							placeholder="Search"
							value={searchStr}
							onChange={(e) => {
								setSearchStr(e.target.value);
							}}
						/>
						<div className="cancel-icon" onClick={() => setSearchStr("")}>
							<CancelIcon />
						</div>
					</div>
					{searchStr ? (
						<div className="dropdown">
							<div className="contents" onClick={() => setSearchStr("")}>
								{searchArray.filter((item) => item.title.includes(searchStr))
									.length ? (
									searchArray.map((item, id) => {
										if (item.title.includes(searchStr)) {
											return (
												<SearchComponent
													src={item.src}
													size="normal"
													title={item.title}
													desc={item.desc}
													action={["View", "/"]}
													key={item.title}
												/>
											);
										} else return "";
									})
								) : (
									<p className="no-results">No results found</p>
								)}
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className="nav-wrapper">
					<Link to="/">
						{location.pathname === "/" ? <BlackHomeIcon /> : <HomeIcon />}
					</Link>
					<Link to="/favourites">
						{location.pathname === "/favourites" ? (
							<BlackHeartIcon />
						) : (
							<HeartIcon />
						)}
					</Link>
				</div>
				<div className="backBtn"></div>
			</div>
		</header>
	);
};

export default Header;

const SearchComponent = ({
	src,
	size,
	title,
	desc,
	action,
}: HomeInfoComponentProps) => {
	return (
		<div className="info-wrapper">
			<div className="info">
				<Link to={title}>
					<img src={src} alt="Favourites" className={size} />
				</Link>
				<div>
					<Link to={title}>{title}</Link>
				</div>
			</div>
		</div>
	);
};
