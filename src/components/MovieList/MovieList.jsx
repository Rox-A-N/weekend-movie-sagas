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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('poster is clicked?');

        routeToDetails();
    }

    const routeToDetails = () => {
        console.log('in the MovieList routeToDetails');
        history.push('/details');
    }


    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={handleSubmit}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;