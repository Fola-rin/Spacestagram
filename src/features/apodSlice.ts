import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type ApodDataStateType = {
	id: number;
	title: string;
	desc: string;
	imgUrl: string;
	hdImgUrl: string;
	date: string;
};
type ServerApodDataType = {
	copyright: string;
	date: string;
	explanation: string;
	hdurl: string;
	media_type: string;
	service_version: string;
	title: string;
	url: string;
};
type ApodDataType = {
	loading: boolean;
	data: ApodDataStateType | {};
	error: string;
};
const initialState: ApodDataType = {
	loading: false,
	data: {},
	error: "",
};

// Generates pending, fulfilled and rejected action types

// return axios
// 	.get("https://images-api.nasa.gov/search?q=planets&media_type=image")
// 	.then((response) => response.data);

export const fetchApodData = createAsyncThunk("apod/fetchApodData", () => {
	return axios
		.get(
			`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_KEY}`
		)
		.then((response) => response.data);
});

// copyright: "Fritz\nHelmut Hemmerich"
// date: "2022-08-07"
// explanation: "What's that green streak in front of the Andromeda galaxy? A meteor. While photographing the Andromeda galaxy in 2016, near the peak of the Perseid Meteor Shower, a small pebble from deep space crossed right in front of our Milky Way Galaxy's far-distant companion. The small meteor took only a fraction of a second to pass through this 10-degree field.  The meteor flared several times while braking violently upon entering Earth's atmosphere.  The green color was created, at least in part, by the meteor's gas glowing as it vaporized. Although the exposure was timed to catch a Perseid meteor, the orientation of the imaged streak seems a better match to a meteor from the Southern Delta Aquariids, a meteor shower that peaked a few weeks earlier.  Not coincidentally, the Perseid Meteor Shower peaks later this week, although this year the meteors will have to outshine a sky brightened by a nearly full moon."
// hdurl: "https://apod.nasa.gov/apod/image/2208/MeteorM31_hemmerich_1948.jpg"
// media_type: "image"
// service_version: "v1"
// title: "Meteor before Galaxy"
// url: "https://apod.nasa.gov/apod/image/2208/MeteorM31_hemmerich_960.jpg"
const apodConversion = (data: ServerApodDataType): ApodDataStateType => {
	const newObj = {
		id: 1,
		title: data.title,
		desc: data.explanation,
		imgUrl: data.url,
		hdImgUrl: data.hdurl,
		date: data.date,
	};
	return newObj;
};
const apodSlice = createSlice({
	name: "apod",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchApodData.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchApodData.fulfilled,
			(state, action: PayloadAction<ServerApodDataType>) => {
				state.loading = false;
				state.data = apodConversion(action.payload);
				state.error = "";
			}
		);
		builder.addCase(fetchApodData.rejected, (state, action) => {
			state.loading = false;
			state.data = [];
			state.error =
				action.error.message || "Something went wrong, Please try again.";
		});
	},
});

const apodReducer = apodSlice.reducer;

export default apodReducer;
