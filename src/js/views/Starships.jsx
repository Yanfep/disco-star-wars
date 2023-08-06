import React, { useContext, useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Starships = () => {

  const { store, actions } = useContext(Context)


  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-3">
        {!store.starships ?

          <Spinner /> :

          store.starships.map((starships) => {

            const urlImg = "https://starwars-visualguide.com/assets/img/starships/" + `${starships.uid}` + ".jpg";
            const handleOnErrorImg = e => { e.target.src = "https://i.pinimg.com/564x/1b/b5/cc/1bb5cc343394c8d86a8a5ad644760959.jpg" }

            return (
              <div className="col" key={starships.uid}>
                <div className="card border">
                <Link to={`/starships/${starships.uid}`}>
                    <img src={urlImg} className="card-img-top img-fluid" onError={handleOnErrorImg} style={{ objectFit: 'cover', height: '300px' }} />
                </ Link>
                  <div className="card-footer pb-3 bg-black text-white">
                    <h5 className="card-title mt-3 mb-3">{starships.name}</h5>
                    <div className="d-flex justify-content-between">
                      <Link to={`/starships/${starships.uid}`}>
                        <button type="button" className="btn btn-sm btn-outline-info">Learn more</button>
                      </ Link>

                      {/* Si el character.name esta en el array store.favorite (utilizando el metodo find)
                       */}
                       {store.favorites.includes(starships.name)
                       ?  <button className="btn btn-sm btn-info" onClick={() => actions.removeFavorite(starships.name)}>
                      <i className="fas fa-heart"></i>
                       </button>
                      :  <button className="btn btn-sm btn-outline-warning" onClick={() => actions.addFavorite(starships.name)}>
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

//Nota: Solucionar las imagenes que estan corridas ya que el uid no es consecutivo