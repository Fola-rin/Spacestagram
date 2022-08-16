import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { shuffleArray } from "../utils";

let currentdate = new Date();

type ApodDataType = {
	copyright: string;
	date: string;
	explanation: string;
	media_type: "video" | "image";
	hdurl: string;
	service_version: string;
	title: string;
	url: string;
	thumbnail_url: string;
};
type NasaImgDataType = {
	data: {
		center: string;
		date_created: string;
		description: string;
		description_508: string;
		keywords: [];
		media_type: string;
		nasa_id: string;
		secondary_creator: string;
		title: string;
	}[];
	href: string;
	links: { href: string; rel: string; render: string }[];
};
type NasaImgType = {
	collection: {
		href: string;
		items: NasaImgDataType[];
		links: [];
		metadata: {};
		version: string;
	};
};
type MarsRoverDataType = {
	camera: { full_name: string; id: number; name: string; rover_id: string };
	earth_date: string;
	img_src: string;
	id: number;
	rover: {
		name: string;
		landing_date: string;
		launch_date: string;
	};
};
type MarsRoverType = {
	photos: MarsRoverDataType[];
};

type ServerArrType = [NasaImgType, ApodDataType[], MarsRoverType];

export type accountType = "nasa_img" | "mars_rover" | "apod" | "favourites";

export type HomeDataObjectType = {
	id: string;
	title: string;
	desc: string;
	imgUrl: string;
	hdImgUrl: string;
	date: string;
	format: "video" | "image";
	account: accountType;
};
export type HomeDataArrType = HomeDataObjectType[][];
type HomeDataType = {
	loading: boolean;
	data: HomeDataArrType;
	error: string;
};
const initialState: HomeDataType = {
	loading: false,
	data: [],
	error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchAllNasaPictures = createAsyncThunk<ServerArrType>(
	"home/fetchAllNasaPictures",
	() => {
		currentdate.setDate(currentdate.getDate() - 4);

		return axios
			.all([
				axios({
					method: "get",
					url: "https://images-api.nasa.gov/search?q=planets&media_type=image",
				}),
				axios({
					method: "get",
					url: `https://api.nasa.gov/planetary/apod?api_key=${
						process.env.REACT_APP_KEY
					}&thumbs=True&start_date=${currentdate.toISOString().split("T")[0]}`,
				}),
				axios({
					method: "get",
					url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.REACT_APP_KEY}`,
				}),
			])
			.then(
				axios.spread((obj1, obj2, obj3) => [obj1.data, obj2.data, obj3.data])
			);
	}
);

const dataConversion = (data: ServerArrType): HomeDataArrType => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	];
	const nasaImgArr = shuffleArray(data[0].collection.items).map(
		(item, id): HomeDataObjectType => {
			const dateArr = item.data[0].date_created.split("T")[0].split("-");

			return {
				id: item.links[0].href
					.replace("https://images-assets.nasa.gov/image/", "")
					.replaceAll("/", "")
					.split("~")[0],
				title: item.data[0].title,
				desc: item.data[0].description,
				imgUrl: item.links[0].href.replace("~thumb", "~thumb"),
				hdImgUrl: item.links[0].href.replace("~thumb", "~thumb"),
				date: `${months[parseInt(dateArr[1]) - 1]} ${dateArr[2]}, ${
					dateArr[0]
				}`,
				format: "image",
				account: "nasa_img",
			};
		}
	);
	const apodObj: HomeDataObjectType[] = data[1].map(
		(item, id): HomeDataObjectType => {
			const dateArr = item.date.split("-");

			return {
				id:
					item.media_type === "video"
						? item.thumbnail_url
								.replace("https://img.youtube.com", "")
								.replaceAll("/", "")
								.replaceAll(".", "")
						: item.url
								.replace("https://apod.nasa.gov/apod/", "")
								.replaceAll("/", "")
								.replaceAll(".", ""),
				title: item.title,
				desc: item.explanation,
				imgUrl: item.media_type === "video" ? item.thumbnail_url : item.url,
				hdImgUrl: item.hdurl ? item.hdurl : "",
				date: `${months[parseInt(dateArr[1]) - 1]} ${dateArr[2]}, ${
					dateArr[0]
				}`,
				format: item.media_type,
				account: "apod",
			};
		}
	);

	const marsRoverArr = shuffleArray(data[2].photos).map(
		(item: MarsRoverDataType, id): HomeDataObjectType => {
			const dateFunc = (date: string) => {
				const dateArr = date.split("-");
				return `${months[parseInt(dateArr[1]) - 1]} ${dateArr[2]}, ${
					dateArr[0]
				}`;
			};

			return {
				id: item.img_src
					.replace("http://", "")
					.replaceAll("/", "")
					.replaceAll(".", ""),
				title: `Mars Rover Picture:${item.id}`,
				desc: `Image taken with the ${item.camera.full_name} from the ${
					item.rover.name
				} rover which lauched on ${dateFunc(
					item.rover.launch_date
				)} and landed on ${dateFunc(item.rover.landing_date)}`,
				imgUrl: item.img_src,
				hdImgUrl: item.img_src,
				date: dateFunc(item.earth_date),
				format: "image",
				account: "mars_rover",
			};
		}
	);

	return [nasaImgArr.slice(0, 5), apodObj, marsRoverArr.slice(0, 5)];
};

const homeSlice = createSlice({
	name: "home",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllNasaPictures.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchAllNasaPictures.fulfilled,
			(state, action: PayloadAction<ServerArrType>) => {
				state.loading = false;
				state.data = dataConversion(action.payload);
				state.error = "";
			}
		);
		builder.addCase(fetchAllNasaPictures.rejected, (state, action) => {
			state.loading = false;
			state.data = [];
			state.error =
				action.error.message || "Something went wrong, Please try again.";
		});
	},
});

const homeReducer = homeSlice.reducer;

export default homeReducer;
