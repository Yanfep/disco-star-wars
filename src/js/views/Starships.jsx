import React, { useContext, useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../component/Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Starships = () => {

  const { store, actions } = useContext(Context)

  const [starships, setStarships] = useState(JSON.parse(localStorage.getItem('starships')));
  console.log(starships)

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-3">
        {!starships ?
          
          <Spinner /> :
          
          starships.results.map((starships, index) => {

            const urlImg = "https://starwars-visualguide.com/assets/img/starships/" + (index + 1) + ".jpg";
            const handleOnErrorImg = e => { e.target.src = "https://star-wars-blog-sandy.vercel.app/star_wars_404.png" }

            return (
              <div className="col" key={index}>
                <div className="card border">
                  <img src={urlImg} className="card-img-top" onError={handleOnErrorImg} />
                  <div className="card-footer pb-3 bg-black text-white">
                    <h5 className="card-title">{starships.name}</h5>


                    <div className="d-flex justify-content-between">
                      <Link to={`/starships/${starships.id}`}>
                        <button type="button" className="btn btn-sm btn-outline-light">Learn more</button>
                      </ Link> {/* Si el character.name esta en el array store.favorite (utilizando el metodo find)
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