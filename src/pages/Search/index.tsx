import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { accountType } from "../../features/homeSlice";

import FavouriteDP from "../../assets/images/favourites.png";
import marsLogo from "../../assets/images/mars-logo.jpg";
import nasaLogo from "../../assets/images/nasa-logo.jpg";
import apodLogo from "../../assets/images/apod-logo.png";

import "../../styles/Search.scss";
import { HomeInfoComponentProps } from "../Home";
import { SearchComponent } from "../../components/Layout/Header";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {};

const SearchPage = (props: Props) => {
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
	return (
		<div className="search-page">
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

			<div className="dropdown">
				<div className="contents" onClick={() => setSearchStr("")}>
					{searchStr.length === 0 ? (
						searchArray.map((item, id) => {
							console.log("lool");

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
						})
					) : searchArray.filter((item) => item.title.includes(searchStr))
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
		</div>
	);
};

export default SearchPage;
