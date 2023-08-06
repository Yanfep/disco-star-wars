import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const PlanetsDetails = () => {

    const {store, actions} = useContext(Context);

    const paramsPlanets = useParams();
    const idPlanets = paramsPlanets.planetsId;
    const planets = JSON.parse(localStorage.getItem('planets'))
    const planetsArr = planets.results;

    const [apiPlanets, setApiPlanets] = useState([]);

    const planetsDetails = planetsArr.filter((element => {
        
        return( idPlanets === element.uid)
    }));
         
 //starshipsDetails es un Arr de 1 solo elemento por lo tanto se debe acceder por medio del index
 const urlPlanets = planetsDetails[0].url;

    const getPlanetsDetails = async () => {

        try {
            const response = await fetch(urlPlanets);

            if (response.ok) {

                const data = await response.json();
                setApiPlanets(data.result.properties);

            } else {
                console.log('Error: ', response.status, response.statusText)
            }
        } catch (error) {
            console.log('Error: ', error)
        }

    };

    useEffect(() => {
        getPlanetsDetails();
    }, [urlPlanets]);

    console.log(apiPlanets);

    const urlImageP = "https://starwars-visualguide.com/assets/img/planets/" + (idPlanets) + ".jpg";
    const handleOnErrorImg = (e) => { e.target.src = "https://i.pinimg.com/564x/1b/b5/cc/1bb5cc343394c8d86a8a5ad644760959.jpg" };
    
    return (
        <div className="container" style={{objectFit: 'cover', maxWidth: '65%'}}>
            <div className="card bg-black border-light mb-3 text-white">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={urlImageP} className="img-fluid rounded-start" alt="..." onError={handleOnErrorImg}/>
                    </div>
                    <div className="col d-flex flex-column justify-content-between m-3">
                    <div className="d-flex justify-content-start m-3">
                            <Link to={`/planets`}>
                                <button type="button" className="btn btn-outline-info">Back Home</button>
                            </Link>
                        

                            {store.favorites.includes(planets.name)
                            ?  <button className="btn btn-sm btn-info" onClick={() => actions.removeFavorite(planets.name)}>
                            <i className="fas fa-heart p-1"></i>
                            </button>
                            :  <button className="btn btn-sm btn-outline-warning" onClick={() => actions.addFavorite(planets.name)}>
                            <i className="fas fa-heart p-1"></i>
                            </button>

                            }   
                        </div>
                        <div className="card-body">
                            <h2 className="card-title m-2">{apiPlanets.name}</h2>
                            <p className="card-text m-0"><strong>Diameter: </strong>{apiPlanets.diameter}</p>
                            <p className="card-text m-0"><strong>Orbital Period: </strong>{apiPlanets.orbital_period}</p>
                            <p className="card-text m-0"><strong>Gravity: </strong>{apiPlanets.gravity}</p>
                            <p className="card-text m-0"><strong>Population: </strong>{apiPlanets.population}</p>
                            <p className="card-text m-0"><strong>Climate: </strong>{apiPlanets.climate}</p>
                            <p className="card-text m-0"><strong>Terrain: </strong>{apiPlanets.terrain}</p>
                            <p className="card-text m-0"><strong>Surface water: </strong>{apiPlanets.surface_water}</p>
                            <p className="card-text m-0"><strong>Name: </strong>{apiPlanets.name}</p>
                            
                        </div>
 
                    </div>
                </div>
            </div>
        </div>
    );
};






