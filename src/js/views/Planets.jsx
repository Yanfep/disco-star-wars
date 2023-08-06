import React, { useContext, useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Planets= () => {

    const { store, actions } = useContext(Context)
    
    const [planets, setPlanets] = useState(JSON.parse(localStorage.getItem('planets')));

    console.log(store.planets);

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-3">
                {!planets ?
                    <Spinner /> :
                    
                    store.planets.map((planets,index) => {

                    

                        const urlImg = "https://starwars-visualguide.com/assets/img/planets/" + (index + 1) + ".jpg";
                        const handleOnErrorImg = e => { e.target.src = "https://i.pinimg.com/564x/1b/b5/cc/1bb5cc343394c8d86a8a5ad644760959.jpg" }

                        return (
                            <div className="col" key={index}>
                            <div className="card border">
                            <Link to={`/planets/${planets.uid}`}>
                                    
                                <img src={urlImg} className="card-img-top" onError={handleOnErrorImg} style={{ objectFit: 'cover', height: '300px' }} />
                                </ Link>
                                <div className="card-footer pb-3 bg-black text-white">
                                    <h5 className="card-title mt-3 mb-3 ">{planets.name}</h5>
                                    <div className="d-flex justify-content-between">
                                    <Link to={`/planets/${planets.uid}`}>
                                            <button type="button" className="btn btn-sm btn-outline-info">Learn more</button>
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