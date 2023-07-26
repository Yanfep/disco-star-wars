import React from "react";
import "../../styles/home.css";
import { People } from "../component/People";
import { Planets } from	"../component/Planets";

export const Home = () => (
	
	<div className=" mt-5 ms-5">
		<People/>
		<Planets/>
	</div>
	
);