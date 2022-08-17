import React, { useEffect, useState } from "react";
import "../../styles/Post.scss";
import FavouriteDP from "../../assets/images/favourites.png";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg";
import { ReactComponent as HeartRedIcon } from "../../assets/icons/heart-red.svg";
import { ReactComponent as HeartWhiteIcon } from "../../assets/icons/heart-white.svg";

import marsLogo from "../../assets/images/mars-logo.jpg";
import nasaLogo from "../../assets/images/nasa-logo.jpg";
import apodLogo from "../../assets/images/apod-logo.png";

import { accountType, HomeDataObjectType } from "../../features/homeSlice";
import { useAppSelector } from "../../app/hooks";
import { accounts } from "../Account";
import { useDispatch } from "react-redux";
import { dislike, like } from "../../features/favouritesSlice";
import NoMatch from "../NoMatch";
import { Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {};

const Post = (props: Props) => {
	const params = useParams<{ account: accountType; post: string }>();
	const dispatch = useDispatch();
	const homeData = useAppSelector((state) => state.homeData);
	const likesData = useAppSelector((state) => state.likes);
	const likes = useAppSelector((state) => state.likes);
	const [showLiked, setshowLiked] = useState<boolean>(false);
	const [showImgLiked, setshowImgLiked] = useState<boolean>(false);
	const [showMore, setShowMore] = useState<boolean>(false);

	const [pageNotFound, setPageNotFound] = useState<string>("");
	const [postDisplayData, setPostDisplayData] = useState<HomeDataObjectType>();
	useEffect(() => {
		if (
			params.account === "apod" ||
			params.account === "mars_rover" ||
			params.account === "nasa_img"
		) {
			if (homeData.data.length) {
				const accountData = homeData.data[accounts[params.account].id];
				console.log(accountData);
				const postData = accountData.find((item) => item.id === params.post);
				if (postData) {
					setPostDisplayData(postData);
					if (likes.find((like) => like.id === postData.id)) {
						setshowLiked(true);
					}
				}
			} else {
				setPostDisplayData(undefined);
			}
		} else if (params.account === "favourites") {
			const postData = likesData.find((item) => item.id === params.post);
			if (postData) {
				setPostDisplayData(postData);

				if (likes.find((like) => like.id === postData.id)) {
					setshowLiked(true);
				}
			} else {
				setPostDisplayData(undefined);
			}
		} else {
			setPostDisplayData(undefined);
		}
	}, [homeData.data, likesData]);

	return (
		<div className="post-container">
			<Link to={`/${params.account}`} className="x-icon">
				<CloseIcon />
			</Link>
			<div className="bg">
				<Link to={`/${params.account}`} />
			</div>
			<div className="post-wrapper">
				{postDisplayData ||
				(homeData.loading && params.account !== "favourites") ? (
					<div className="post">
						<div className="desc-header mobile">
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
								loading="lazy"
								alt={params.account ? params.account : ""}
							/>
							<Link to={`/${params.account}`}>{params.account}</Link>
						</div>
						<div
							className="img-wrapper"
							onDoubleClick={() => {
								if (postDisplayData) {
									setshowLiked(true);
									setshowImgLiked(true);
									dispatch(like(postDisplayData));
									setTimeout(() => {
										setshowImgLiked(false);
									}, 2000);
								}
							}}
						>
							{homeData.loading && params.account !== "favourites" ? (
								<Skeleton animation="wave" />
							) : (
								<>
									<img
										src={
											postDisplayData?.hdImgUrl
												? postDisplayData?.hdImgUrl
												: postDisplayData?.imgUrl
										}
										alt={postDisplayData?.title}
									/>
									<div className={`liked-img ${showImgLiked ? "liked" : ""}`}>
										<HeartWhiteIcon />
									</div>
								</>
							)}
						</div>
						<div className="desc-wrapper">
							<div className="desc-header">
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
									alt={params.account ? params.account : ""}
								/>
								<Link to={`/${params.account}`}>{params.account}</Link>
							</div>
							<div className="desc-action mobile">
								<button
									onClick={() => {
										if (postDisplayData) {
											setshowLiked(!showLiked);
											dispatch(dislike(postDisplayData));
										}
									}}
								>
									{showLiked ? (
										<HeartRedIcon className="like" />
									) : (
										<HeartIcon />
									)}
								</button>
							</div>
							<div className="desc">
								{homeData.loading && params.account !== "favourites" ? (
									<Skeleton animation="wave" />
								) : (
									<>
										<p>
											<Link to={`/${params.account}`}>{params.account}</Link>
											&nbsp;{" "}
											{postDisplayData?.desc ? (
												showMore || postDisplayData.desc.length < 100 ? (
													postDisplayData.desc
												) : (
													<>
														{postDisplayData.desc.slice(0, 100)}...
														<span onClick={() => setShowMore(true)}> more</span>
													</>
												)
											) : (
												"Loading..."
											)}
										</p>
										<p>{postDisplayData?.date}</p>
									</>
								)}
							</div>
							<div className="desc-action">
								<button
									onClick={() => {
										if (postDisplayData) {
											setshowLiked(!showLiked);
											dispatch(dislike(postDisplayData));
										}
									}}
								>
									{showLiked ? (
										<HeartRedIcon className="like" />
									) : (
										<HeartIcon />
									)}
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="post">
						<NoMatch />
					</div>
				)}
			</div>
		</div>
	);
};

export default Post;
