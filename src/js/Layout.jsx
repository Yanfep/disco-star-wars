import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/Home.jsx";
import { Characters } from "./views/Characters.jsx";
import { CharactersDetails } from "./views/CharactersDetails.jsx";
import { Planets } from "./views/Planets.jsx";
import { PlanetsDetails } from "./views/PlanetsDetails.jsx"
import { Starships } from "./views/Starships.jsx";
import { StarshipsDetails } from "./views/StarshipsDetails.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";



//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="bg-black">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/characters" element={< Characters />}></Route>
						<Route path="/characters/:charactersId" element={< CharactersDetails />}></Route>
						<Route path="/planets" element={< Planets />}></Route>
						<Route path="/planets/:planetsId" element={< PlanetsDetails />}></Route>
						<Route path="/starships" element={< Starships />}></Route>
						<Route path="/starships/:starshipsId" element={< StarshipsDetails />}></Route>
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);

//El injectContext se importo y ahora se exporta enviando a layout como parametro. 
//Esta funcion se encarga de inyectar el contexto del proyecto