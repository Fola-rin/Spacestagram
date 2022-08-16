import { HomeDataObjectType } from "./features/homeSlice";

export const shuffleArray = (array: any[]) => {
	let shuffledArray = array
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

	return shuffledArray;
};
