import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Details() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS' });
    }, []);

 
    return (
        <main>
            <h1>{movies.title}</h1>
            <section className="movieDetails">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                            <h2>{movie.description}</h2>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default Details;