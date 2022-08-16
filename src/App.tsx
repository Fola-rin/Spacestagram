import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { fetchAllNasaPictures } from "./features/homeSlice";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Account from "./pages/Account";
import Post from "./pages/Post";
import Layout from "./components/Layout";

type Props = {};

const App = (props: Props) => {
	// const count = useAppSelector((state: RootState) => state.counter.value);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllNasaPictures());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:account" element={<Account />}>
						<Route path=":post" element={<Post />} />
					</Route>
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
