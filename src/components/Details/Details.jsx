import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


function Details() {

    const dispatch = useDispatch();

    const history = useHistory();
    const movies = useSelector(store => store.movies);
    const genres = useSelector((store) => store.genres);

    const { id } = useParams();

    
    
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
                <h2>Genres:</h2>
            {/* Map through genres to be rendered on the DOM */}
                {genres.map((genre, i) => (
                    <h3 key={i}>{genre.name}</h3>
                ))}        
                {movies.map((movie) => {
                    return (
                        <div key={movie.id} >
                            <h2>{movie.title}</h2>
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