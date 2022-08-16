import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeDataObjectType } from "./homeSlice";

export type FavouritesStateType = HomeDataObjectType[];

const initialState: FavouritesStateType = localStorage.getItem("favourites")
	? JSON.parse(localStorage.getItem("favourites") || "")
	: [];

const favouritesSlice = createSlice({
	name: "likes",
	initialState,
	reducers: {
		like: (state, action: PayloadAction<HomeDataObjectType>) => {
			// state.numOfCakes--;
			if (state.find((item) => item.id === action.payload.id)) {
			} else {
				localStorage.setItem(
					"favourites",
					JSON.stringify([action.payload, ...state])
				);
				state.unshift(action.payload);
			}
		},
		dislike: (state, action: PayloadAction<HomeDataObjectType>) => {
			if (state.find((item) => item.id === action.payload.id)) {
				localStorage.setItem(
					"favourites",
					JSON.stringify(state.filter((item) => item.id !== action.payload.id))
				);
				return state.filter((item) => item.id !== action.payload.id);
			} else {
				localStorage.setItem(
					"favourites",
					JSON.stringify([action.payload, ...state])
				);
				state.unshift(action.payload);
			}
		},
	},
});

export default favouritesSlice.reducer;
export const { like, dislike } = favouritesSlice.actions;
