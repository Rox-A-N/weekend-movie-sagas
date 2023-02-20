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
        <main className='background'>
            <h2>MovieList</h2>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div className='card' key={movie.id} >
                            <div className='header'>
                                <h3>{movie.title}</h3>
                            </div>
                            <div className='container'>
                                <img className='card-layout__item' src={movie.poster} alt={movie.title} onClick={(event) => handleSubmit(event, movie.id)}/>
                            </div>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;