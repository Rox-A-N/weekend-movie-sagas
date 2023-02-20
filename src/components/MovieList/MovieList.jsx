import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // useEffect(() => {
        

    const handleSubmit = (event, id) => {
        event.preventDefault();
        console.log('poster is clicked?');
        dispatch({ 
            type: 'FETCH_GENRES',
            payload: id 
        });
    

        routeToDetails(id);
    }

    const routeToDetails = (id) => {
        console.log('in the MovieList routeToDetails', id);
        history.push(`/movies/${id}`);
    }


    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={(event) => handleSubmit(event, movie.id)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;