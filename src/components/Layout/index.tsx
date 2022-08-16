import React, { ReactNode } from "react";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<div>
			<Header />
			<main>
				<div className="main-wrapper">{children}</div>
			</main>
			<BottomNav />
			<Footer />
		</div>
	);
};

export default Layout;
