import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const CharactersDetails = () => {

    const { store, actions } = useContext(Context);

    //Los parametros son los definidos en el layaut con users/:userId
    const params = useParams();
    // const id = params.charactersId - 1; //Se resta 1 porque el array inicia en posicion 0
    const idPeople = params.charactersId;
    const charactersView = JSON.parse(localStorage.getItem('characters'));
    const charactersArr = charactersView.results;
    // const url = charactersArr[id].url

    const charactersDetails = charactersArr.filter((element => {
        
        return( idPeople === element.uid)

    }));

    const url2 = charactersDetails[0].url;

    const [people, setPeople] = useState([]);

    const getCharactersDetails = async () => {

        try {
            const response = await fetch(url2);

            if (response.ok) {

                const data = await response.json();
                setPeople(data.result.properties);

            } else {
                console.log('Error: ', response.status, response.statusText)
            }
        } catch (error) {
            console.log('Error: ', error)
        }

    };

    useEffect(() => {
        getCharactersDetails();
    }, [url2]);
    console.log(people)

    const urlImage = "https://starwars-visualguide.com/assets/img/characters/" + (idPeople) + ".jpg";
    const handleOnErrorImg = (e) => { e.target.src = "https://w0.peakpx.com/wallpaper/404/342/HD-wallpaper-404-blank-logo-no-tumblr-ultra.jpg" };

    return (
        <div className="container" style={{objectFit: 'cover', maxWidth: '65%'}}>
            <div className="card bg-black border-light mb-3 text-white">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={urlImage} className="img-fluid rounded-start" alt="..." onError={handleOnErrorImg}/>
                    </div>
                    <div className="col d-flex flex-column justify-content-between m-4">
                    <div className="d-flex justify-content-start m-3">
                            <Link to={`/characters`}>
                                <button type="button" className="btn btn-outline-info">Back Home</button>
                            </Link>

                            {store.favorites.includes(people.name)
                            ?  <button className="btn btn-sm btn-info" onClick={() => actions.removeFavorite(people.name)}>
                            <i className="fas fa-heart p-1"></i>
                            </button>
                            :  <button className="btn btn-sm btn-outline-warning" onClick={() => actions.addFavorite(people.name)}>
                            <i className="fas fa-heart p-1"></i>
                            </button>

                            }   
                       
                       
                        </div> 
                        <div className="card-body">
                            <h2 className="card-title m-2">{people.name}</h2>
                            <p className="card-text m-2"><strong>Gender: </strong>{people.gender}</p>
                            <p className="card-text m-2"><strong>Birth Year: </strong> {people.birth_year}</p>
                            <p className="card-text m-2"><strong>Hair Color: </strong> {people.hair_color}</p>
                            <p className="card-text m-2"><strong>Eye Color: </strong> {people.eye_color}</p>
                            <p className="card-text m-2"><strong>Height: </strong> {people.height}</p>
                            <p className="card-text m-2"><strong>Name: </strong> {people.name}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};