import React, { useContext, useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Planets= () => {

    const { store, actions } = useContext(Context)
    
    const [planets, setPlanets] = useState(JSON.parse(localStorage.getItem('planets')));

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-3">
                {!planets ?
                    <Spinner /> :
                    planets.results.map((planets, index) => {

                        const urlImg = "https://starwars-visualguide.com/assets/img/planets/" + (index + 1) + ".jpg";
                        const handleOnErrorImg = e => { e.target.src = "https://star-wars-blog-sandy.vercel.app/star_wars_404.png" }

                        return (
                            <div className="col" key={index}>
                                <div className="card border">
                                    <img src={urlImg} className="card-img-top" onError={handleOnErrorImg} />
                                    <div className="card-footer pb-3 bg-black text-white">
                                        <h5 className="card-title">{planets.name}</h5>
                                        <p className="card-text"> Population:  </p>
                                        <p className="card-text"> Terrain:  </p>
                                        <div className="d-flex justify-content-between">
                                            <Link to={`algun lugar`}>
                                                <button type="button" className="btn btn-sm btn-outline-light">Learn more</button>
                                            </ Link>

                                             {/* Si el character.name esta en el array store.favorite (utilizando el metodo find)
                                            */}

                                            {store.favorites.includes(planets.name)
                                            ?  <button className="btn btn-sm btn-info" onClick={() => actions.removeFavorite(planets.name)}>
                                            <i className="fas fa-heart"></i>
                                                </button>
                                            :  <button className="btn btn-sm btn-outline-warning" onClick={() => actions.addFavorite(planets.name)}>
                                            <i className="fas fa-heart"></i>
                                            </button>
                                              }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

            </div>
        </div>

    );
}