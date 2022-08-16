import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import FavouriteDP from "../../assets/images/favourites.png";
import NoPosts from "../../assets/images/no-posts.png";
import marsLogo from "../../assets/images/mars-logo.jpg";
import nasaLogo from "../../assets/images/nasa-logo.jpg";
import apodLogo from "../../assets/images/apod-logo.png";

import { accountType, HomeDataObjectType } from "../../features/homeSlice";

import "../../styles/Account.scss";
import NoMatch from "../NoMatch";

type Props = {};
export const accounts = {
	apod: {
		id: 1,
		title: "Astronomy Picture of the Day",
		desc: "One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.",
	},
	mars_rover: {
		id: 2,
		title: "Mars Rover Photos",
		desc: "Image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars",
	},
	nasa_img: {
		id: 0,
		title: "NASA Image Library",
		desc: "A collection of some of the images from Nasa's image library",
	},
	favourites: {
		id: 3,
		title: "Likes Photos",
		desc: "This account contains all the post you've liked on Spacetagram. To like a post, simply double tap(or click) or tap(or click) the like button.",
	},
};

const Account = (props: Props) => {
	const params = useParams<{ account: accountType }>();
	console.log("params", params.account);

	const homeData = useAppSelector((state) => state.homeData);
	const likesData = useAppSelector((state) => state.likes);

	const [pageNotFound, setPageNotFound] = useState<string>("");

	const [accountDisplayData, setAccountDisplayData] = useState<
		HomeDataObjectType[]
	>([]);

	useEffect(() => {
		if (
			params.account === "apod" ||
			params.account === "mars_rover" ||
			params.account === "nasa_img"
		) {
			if (homeData.data.length) {
				setAccountDisplayData(homeData.data[accounts[params.account].id]);
			}
		} else if (params.account === "favourites") {
			setAccountDisplayData(likesData);
		} else {
			setAccountDisplayData([]);
		}
	}, [homeData.data, likesData, params]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);
	return (
		<>
			<Outlet />
			<div className="account-wrapper">
				{accountDisplayData.length ||
				(homeData.loading && params.account !== "favourites") ||
				params.account === "favourites" ? (
					<>
						<div className="account-header">
							<div className="img-wrapper">
								<img
									src={
										params.account === "apod"
											? apodLogo
											: params.account === "mars_rover"
											? marsLogo
											: params.account === "nasa_img"
											? nasaLogo
											: FavouriteDP
									}
									alt="Favourites"
								/>
								<h2>{params.account}</h2>
							</div>
							<div className="desc">
								<h2>{params.account}</h2>
								<p className="posts">
									<span>
										{accountDisplayData.length
											? accountDisplayData.length
											: "0"}
									</span>{" "}
									posts
								</p>
								<div className="title-desc">
									<p>
										{params.account
											? accounts[params.account]
												? accounts[params.account].title
												: ""
											: ""}
									</p>
									<p>
										{params.account
											? accounts[params.account]
												? accounts[params.account].desc
												: ""
											: ""}
									</p>
								</div>
								<p className="posts mobile">
									<span>
										{accountDisplayData.length
											? accountDisplayData.length
											: "0"}
									</span>{" "}
									<br />
									<span>posts</span>
								</p>
							</div>
						</div>
						<div className="posts-area">
							{homeData.loading && params.account !== "favourites" ? (
								<div className="posts-grid">
									<div className="post">
										<div className="img-wrapper">
											<Skeleton animation="wave" />
										</div>
									</div>
									<div className="post">
										<div className="img-wrapper">
											<Skeleton animation="wave" />
										</div>
									</div>
									<div className="post">
										<div className="img-wrapper">
											<Skeleton animation="wave" />
										</div>
									</div>
								</div>
							) : accountDisplayData && accountDisplayData.length ? (
								<div className="posts-grid">
									{accountDisplayData.map((item, id) => (
										<div className="post" key={id}>
											<Link to={item.id} />
											<div className="img-wrapper">
												<img src={item.imgUrl} alt="Favourites" />
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="no-posts">
									<div>
										<img src={NoPosts} alt="No posts" />
										<h1>
											{params.account === "favourites"
												? "No Liked Posts Yet"
												: "No Posts Yet"}
										</h1>
									</div>
								</div>
							)}
						</div>
					</>
				) : (
					<NoMatch />
				)}
			</div>
		</>
	);
};

export default Account;
