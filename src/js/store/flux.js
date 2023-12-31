const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			characters: [],
			planets: [],
			starships: [],
		},
		actions: {
			// Use getActions to call a function within a fuction

			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},

			addFavorite: (title) => {
                // Utilizar metodo find de los arrays para buscar si tengo title, si no existe lo agrego y si existe no hace nada
            
                const store = getStore();
                
				if(store.favorites.includes(title)){
                    console.log("Already in favorites");
                } else {
                	setStore({ favorites: [...getStore().favorites, title] })
                }
    
            },

			removeFavorite: (title) => {
                // Tengo que enviar el mismo title, buscar si existe en el array igual que con el include y el remove. Con el filtro
                setStore({
                    favorites: getStore().favorites.filter((item, i) => {
                        return item !== title;
                    })
                })
                //Esta fx recibe un id(indice del arr) y filtra todos los que sean distintos al arr que esta enviando y guarda el rdo en favorite
            },

			getCharacters: async () => {

				if (localStorage.getItem('characters') !== null) {
					// Si los datos de los characters están en el almacenamiento local, obtén los datos de allí
					const charactersFromStorage = JSON.parse(localStorage.getItem('characters'));
					// Actualiza el estado de 'characters[]' en el store
					setStore({ characters: charactersFromStorage.results });

				} else {
					// Si no entonces realiza la solicitud a la API
					const response = await fetch('https://www.swapi.tech/api/people');

					if (response.ok) {

						const data = await response.json();
						localStorage.setItem('characters', JSON.stringify(data))
						setStore({ characters: data.results });

					} else {
						console.log('Error: ', response.status, response.statusText)
					}
				}

			},

			getPlanets: async () => {
				if (localStorage.getItem('planets') !== null) {
					// Si los datos de los planetas están en el almacenamiento local, obtén los datos de allí
					const planetsFromStorage = JSON.parse(localStorage.getItem('planets'));
					setStore({ planets: planetsFromStorage.results });

				} else {
					// Si no entonces realiza la solicitud a la API
					const response = await fetch('https://www.swapi.tech/api/planets');

					if (response.ok) {
						const data = await response.json();
						localStorage.setItem('planets', JSON.stringify(data));

						// Actualiza el estado del store con los datos de los planetas obtenidos
						setStore({ planets: data.results });
					} else {
						console.log('Error: ', response.status, response.statusText);
					}

				}
			},

			getStarships: async () => {

				if (localStorage.getItem('starships') !== null) {
					// Si los datos de los planetas están en el almacenamiento local, obtén los datos de allí
					const starshipsFromStorage = JSON.parse(localStorage.getItem('starships'));
					setStore({ starships: starshipsFromStorage.results });

				} else {
					// Si no entonces realiza la solicitud a la API
					const response = await fetch("https://www.swapi.tech/api/starships",);

					if (response.ok) {
						const data = await response.json();
						localStorage.setItem('starships', JSON.stringify(data));

						// Actualiza el estado del store con los datos de los planetas obtenidos
						setStore({ starships: data.results });
					} else {
						console.log('Error: ', response.status, response.statusText);
					}

				}
			}
		}
	}
};

export default getState;
