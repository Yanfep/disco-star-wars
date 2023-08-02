import React, { useContext, useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Characters = () => {

    const { store, actions } = useContext(Context)
    const characters = JSON.parse(localStorage.getItem('characters'))
    console.log(characters)

  
    
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-4">
                {!characters ?
                    <Spinner /> :
                    characters.results.map((characters, index) => {

                        const urlImg = "https://starwars-visualguide.com/assets/img/characters/" + (index + 1) + ".jpg";
                        const handleOnErrorImg = e => { e.target.src = "https://star-wars-blog-sandy.vercel.app/star_wars_404.png" }

                        return (
                            <div className="col" key={index}>
                                <div className="card border">
                                    <img src={urlImg} className="card-img-top" alt="card image" onError={handleOnErrorImg} style={{ objectFit: 'cover',}}></img>
                                    <div className="card-footer pb-3 bg-black text-white">
                                        
                                        <h5 className="">{characters.name}</h5>

                                        <div className="d-flex justify-content-between">
                                            <Link to={`/characters/${characters.uid}`}>
                                                <button type="button" className="btn btn-sm btn-outline-light">Learn more</button>
                                            </ Link>
                                            
                                            {/* Si el character.name esta en el array store.favorite (utilizando el metodo find)
                                            */}

                                            {store.favorites.includes(characters.name)
                                            ?  <button className="btn btn-sm btn-info" onClick={() => actions.removeFavorite(characters.name)}>
                                            <i className="fas fa-heart"></i>
                                                </button>
                                            :  <button className="btn btn-sm btn-outline-warning" onClick={() => actions.addFavorite(characters.name)}>
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