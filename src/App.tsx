import React, { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { fetchAllNasaPictures } from "./features/homeSlice";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Account from "./pages/Account";
import Post from "./pages/Post";
import Layout from "./components/Layout";
import SearchPage from "./pages/Search";
import { ReactComponent as Logo } from "./assets/logo-12.svg";
const LazyAccount = React.lazy(() => import("./pages/Account"));
const LazyPost = React.lazy(() => import("./pages/Post"));
const LazyHome = React.lazy(() => import("./pages/Home"));

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
					<Route
						path="/"
						element={
							<Suspense fallback={<FallBackUI />}>
								<LazyHome />
							</Suspense>
						}
					/>
					<Route path="/search" element={<SearchPage />} />

					<Route
						path="/:account"
						element={
							<Suspense fallback={<FallBackUI />}>
								<LazyAccount />
							</Suspense>
						}
					>
						<Route
							path=":post"
							element={
								<Suspense fallback={<FallBackUI />}>
									<LazyPost />
								</Suspense>
							}
						/>
					</Route>
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;

const FallBackUI = () => {
	return (
		<div className="fallback">
			<div>
				<Logo />
			</div>
			<p>
				{" "}
				Spacestagram from{" "}
				<a href="https://folarin.netlify.app" target="_blank" rel="noreferrer">
					Oyeleke Afolarin
				</a>
			</p>
		</div>
	);
};
