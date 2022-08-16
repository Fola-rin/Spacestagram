import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import homeReducer from "../features/homeSlice";
import apodReducer from "../features/apodSlice";
import favouritesReducer from "../features/favouritesSlice";

export const store = configureStore({
	reducer: {
		homeData: homeReducer,
		apodData: apodReducer,
		likes: favouritesReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
