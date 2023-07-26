const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			peopleStarWars: [],
			planetsStarWars: [],

		},
		
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			fetchPeopleStarWars: async () => {
				try {
				  const response = await fetch('https://www.swapi.tech/api/people/');
				  const data = await response.json();
			  
				  const characterPromises = data.results.map(async character => {
					const characterResponse = await fetch(character.url);
					const characterData = await characterResponse.json();
					return {
					  name: characterData.result.properties.name,
					  gender: characterData.result.properties.gender,
					  hairColor: characterData.result.properties.hair_color,
					  eyeColor: characterData.result.properties.eye_color
					};
				  });
			  
				  const charactersWithDetails = await Promise.all(characterPromises);
				  setStore({ peopleStarWars: charactersWithDetails });
				} catch (err) {
				  console.error(err);
				  setStore({ peopleStarWars: [] });
				}
			  },

			  fetchPlanetsStarWars: async () => {
				try {
				  const response = await fetch('https://www.swapi.tech/api/planets/');
				  const data = await response.json();
			  
				  const planetPromises = data.results.map(async planet => {
					const planetResponse = await fetch(planet.url);
					const planetData = await planetResponse.json();
					return {
					  name: planetData.result.properties.name,
					  climate: planetData.result.properties.climate,
					  terrain: planetData.result.properties.terrain,
					  population: planetData.result.properties.population
					};
				  });
			  
				  const planetsWithDetails = await Promise.all(planetPromises);
				  setStore({ planetsStarWars: planetsWithDetails });
				} catch (err) {
				  console.error(err);
				  setStore({ planetsStarWars: [] });
				}
			  },
		}
	};
};

export default getState;



