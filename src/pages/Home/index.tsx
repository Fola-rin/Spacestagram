import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Layout from "../../components/Layout";
import {
	accountType,
	fetchAllNasaPictures,
	HomeDataArrType,
	HomeDataObjectType,
} from "../../features/homeSlice";
import { shuffleArray } from "../../utils";

import "../../styles/Home.scss";
import FavouriteDP from "../../assets/images/favourites.png";
import marsLogo from "../../assets/images/mars-logo.jpg";
import nasaLogo from "../../assets/images/nasa-logo.jpg";
import apodLogo from "../../assets/images/apod-logo.png";

import loader from "../../assets/images/loading.webp";

import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg";
import { ReactComponent as HeartRedIcon } from "../../assets/icons/heart-red.svg";
import { ReactComponent as HeartWhiteIcon } from "../../assets/icons/heart-white.svg";

import { Link, useParams } from "react-router-dom";
import {
	dislike,
	FavouritesStateType,
	like,
} from "../../features/favouritesSlice";
import { Skeleton } from "@mui/material";

type Props = {};
export type HomeInfoComponentProps = {
	src: string;
	size: "large" | "normal";
	title: string;
	desc: string;
	action: [string, string];
};
type HomeDataComponentProps = {
	id: number;
	item: HomeDataObjectType;
};

const Home = (props: Props) => {
	const dispatch = useAppDispatch();
	const homeData = useAppSelector((state) => state.homeData);
	const likes = useAppSelector((state) => state.likes);

	console.log(likes);

	const [homeDisplayData, setHomeDisplayData] = useState<HomeDataObjectType[]>(
		[]
	);

	useEffect(() => {
		if (homeData.data.length) {
			const newArr = [
				...homeData.data[1],
				...homeData.data[0],
				...homeData.data[2],
			];
			setHomeDisplayData(shuffleArray(newArr));
			console.log();
		}
	}, [homeData.data]);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<>
			<div className="home-wrapper">
				<div className="home-data-wrapper">
					<div className={`loader${homeData.loading ? " show" : ""}`}>
						<img src={loader} alt="loader" />
					</div>
					{homeData.loading ? (
						<>
							<HomeDataLoadingComponent />
							<HomeDataLoadingComponent />
						</>
					) : (
						homeDisplayData.map((item, id) => (
							<HomeDataComponent id={id} item={item} key={id} />
						))
					)}
				</div>
				<div className="home-info-wrapper">
					<HomeInfoComponent
						src={FavouriteDP}
						size="large"
						title="favourites"
						desc="See your liked photos"
						action={["View", "/"]}
					/>
					<div className="suggestions">
						<h4>Suggestions For You</h4>
						<HomeInfoComponent
							src={apodLogo}
							size="normal"
							title="apod"
							desc="Astronomy Picture of the Day"
							action={["View", "/"]}
						/>
						<HomeInfoComponent
							src={marsLogo}
							size="normal"
							title="mars_rover"
							desc="Mars Rover Photos"
							action={["View", "/"]}
						/>
						<HomeInfoComponent
							src={nasaLogo}
							size="normal"
							title="nasa_img"
							desc="NASA Images"
							action={["View", "/"]}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;

const HomeDataComponent = ({ id, item }: HomeDataComponentProps) => {
	const dispatch = useAppDispatch();
	const likes = useAppSelector((state) => state.likes);
	const [showLiked, setshowLiked] = useState<boolean>(false);
	const [showImgLiked, setshowImgLiked] = useState<boolean>(false);
	const [showMore, setShowMore] = useState<boolean>(false);

	useEffect(() => {
		if (likes.find((like) => like.id === item.id)) {
			setshowLiked(true);
		}
	}, [likes]);

	return (
		<div className="home-data">
			<div className="data-header">
				<div className="img-wrapper">
					<img
						src={
							item.account === "apod"
								? apodLogo
								: item.account === "mars_rover"
								? marsLogo
								: item.account === "nasa_img"
								? nasaLogo
								: FavouriteDP
						}
						alt={item.account ? item.account : ""}
						loading="lazy"
					/>
				</div>
				<Link to={item.account}>{item.account}</Link>
			</div>
			<div
				className="main-img"
				onDoubleClick={() => {
					if (item) {
						setshowLiked(true);
						setshowImgLiked(true);
						dispatch(like(item));
						setTimeout(() => {
							setshowImgLiked(false);
						}, 2000);
					}
				}}
			>
				<img src={item.imgUrl} alt={item.title} loading="lazy" />
				<div className={`liked-img ${showImgLiked ? "liked" : ""}`}>
					<HeartWhiteIcon />
				</div>
			</div>
			<div className="data-desc-action">
				<button
					onClick={() => {
						setshowLiked(!showLiked);
						dispatch(dislike(item));
					}}
				>
					{showLiked ? <HeartRedIcon className="like" /> : <HeartIcon />}
				</button>
				<div>
					<Link to={item.account}>{item.account}</Link>&nbsp;
					{showMore || item.desc.length < 100 ? (
						item.desc
					) : (
						<>
							{item.desc.slice(0, 100)}...
							<span onClick={() => setShowMore(true)}> more</span>
						</>
					)}
				</div>
				<p>{item.date}</p>
			</div>
		</div>
	);
};

const HomeDataLoadingComponent = () => {
	return (
		<div className="home-data">
			<div className="data-header">
				<div className="img-wrapper">
					<Skeleton animation="wave" />
				</div>
			</div>
			<div className="main-img">
				<Skeleton animation="wave" />
			</div>
		</div>
	);
};

// youtube-nocookie.com/embed/
{
	/* <iframe
					width="100"
					height="315"
					src="https://www.youtube.com/embed/rFDjAfwmWKM?rel=0"
				></iframe> */
}

const HomeInfoComponent = ({
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
					<img src={src} alt="Favourites" className={size} loading="lazy" />
				</Link>
				<div>
					<Link to={title}>{title}</Link>
					<p className={size}>{desc}</p>
				</div>
			</div>
			<div className="action">
				<Link to={title}>{action[0]}</Link>
			</div>
		</div>
	);
};
