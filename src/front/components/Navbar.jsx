import { useState, useEffect } from "react";
import { NavbarPrivate } from "../pages/navbar/NavbarPrivate";
import { NavbarGuest } from "../pages/navbar/NavbarGuest";

export const Navbar = () => {
	const [token, setToken] = useState(localStorage.getItem("user_token"));

	useEffect(() => {
		const interval = setInterval(() => {
			setToken(localStorage.getItem("user_token"));
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<nav className="main-navbar">
			<div>
				{token ? <NavbarPrivate /> : <NavbarGuest />}
			</div>
		</nav>
	);
};