import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const NoMatch = (props: Props) => {
	return (
		<div className="no-match">
			<h2>Sorry, this page isn't available.</h2>
			<p>
				The link you followed may be broken, or the page may have been removed.
				<Link to="/"> Go back to Spacestgram.</Link>
			</p>
		</div>
	);
};

export default NoMatch;
