import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


function Details() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);
    const { id } = useParams();
    const movie = useSelector((store) => store.movieDetails);


    useEffect(() => {
        console.log('here is the ', {id});
        dispatch({ type: 'FETCH_DETAILS',
                    payload: {id} }); // grab the specific id
    }, []);

    const routeToList = () => {
        history.push('/');
    }

 
    return (
        <main>
            <h1>Movie Details</h1>
            <section className="movieDetails">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                            <h2>{movie.description}</h2>
                            <button onClick={routeToList}>Return to List</button>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default Details;