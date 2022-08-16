import React from "react";
import "../../styles/Footer.scss";

type Props = {};
const date = new Date();
const Footer = (props: Props) => {
	return (
		<footer className="footer">
			{date.getFullYear()} Spacestagram from{" "}
			<a href="https://folarin.netlify.app" target="_blank" rel="noreferrer">
				Oyeleke Afolarin
			</a>
		</footer>
	);
};

export default Footer;
