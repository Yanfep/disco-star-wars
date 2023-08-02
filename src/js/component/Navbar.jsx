import React from "react";
import { Link } from "react-router-dom";
import { BtnFavorites } from "./BtnFavorites.jsx";

export const Navbar = () => {
	return (
		<div className="container p-3">
			<div className="row flex-nowrap justify-content-between align-items-center">

				<div className="col-2 text-center">
					<Link to="/" className="nav-item nav-link link-body-emphasis active">					
						<img id="local-nav-logo-desktop" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" style={{ width: "220px" }} alt="Logo StarWars" />
					</Link>
				</div>

				<div className="col-4 d-flex justify-content-end align-items-center">
					< BtnFavorites />
				</div>

			</div>

			<div className="nav-scroller py-1 mb-3 border-bottom">
				<nav className="nav nav-underline justify-content-center">
					<Link to="/" className="nav-item nav-link link-body-emphasis active">
						<span className="h5 text-white">All</span>
					</Link>
					<Link to="/characters" className="nav-item nav-link link-body-emphasis active">
						<span className="h5 text-white">Characters</span>
					</Link>
					<Link to="/planets" className="nav-item nav-link link-body-emphasis active">
						<span className="h5 text-white">Planets</span>
					</Link>
					<Link to="/starships" className="nav-item nav-link link-body-emphasis active">
						<span className="h5 text-white">Starships</span>
					</Link>
				</nav>
			</div>
		</div>
	)
}