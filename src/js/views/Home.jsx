import React from "react";
import "../../styles/home.css";
import { Characters } from "./Characters.jsx";
import { Planets } from "./Planets.jsx";
import { Starships } from "./Starships.jsx";

 export const Home = () => {

 	return (

         <>
           <section className="mb-4 ">
                 <Characters />
            </section>
            <section className="mb-4 ">
                 <Planets />
            </section>
            <section className="mb-4 ">
                 <Starships />
            </section>
         </>
    
 	)
 };