import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Details.css';
import SubmitButton from '../../ui_library/SubmitButton';

function Details() {

    const dispatch = useDispatch();

    // name of const a pizza situation, store.movies comes from the reducer name
    const movies = useSelector(store => store.movies);  
    const genres = useSelector((store) => store.genres);

    const { id } = useParams();

    
    
    useEffect(() => {
        console.log('here is the ', {id});
        dispatch({ type: 'FETCH_DETAILS',
        payload: { id } }); // grab the specific id
    }, [ id ]);             // will update if id changes, not just on page load
    
    
    
    return (
        <main>
            <h2>Movie Details</h2>
            <section className="movieDetails">
                <h3>Genres:</h3>
            {/* Map through genres to be rendered on the DOM */}
                {genres.map((genre, i) => (
                    <h3 key={i}>{genre.name}</h3>
                ))}        
                {movies.map((movie) => {
                    return (
                        <div key={movie.id} >
                            <section className='details'>
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title}/>
                                <h4>{movie.description}</h4>
                            </section>
                            <SubmitButton />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default Details;