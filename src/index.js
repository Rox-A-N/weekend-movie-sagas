import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function aka watcherSaga
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // FETCH_DETAILS
    yield takeEvery('FETCH_DETAILS', fetchMovieDetails);
    yield takeEvery('FETCH_GENRES', fetchGenres);    // future generator function fetchGenres
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch (e) {
        console.log('get all error', e);
    }
        
}

function* fetchMovieDetails(action) {      
    // define id with the payload
    // console.log('fetchMovieDetails saga: ', action);
    try {
        const movie = yield axios.get(`/api/movie/${action.payload.id}`);
        console.log('get details:', movie.data);
        yield put({type: 'SET_MOVIES', payload: movie.data});
    } catch (e) {
        console.log('get details error', e);
    }
}

function* fetchGenres(action) {
    console.log('Inside the fetchGenre:', action.payload);
    // fetch genres from db
    try {
        const genres = yield axios.get(`/api/genre/${action.payload}`);
        console.log('Movie genre(s):', genres.data);
        yield put({type: 'SET_GENRES', payload: genres.data});
    } catch {
        console.log('fetchGenres error');
    }
}



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}



// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
