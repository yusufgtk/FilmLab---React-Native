import React, { useReducer } from 'react';

const MovieContext = React.createContext();


const MovieReducer = (state, action) => {
    switch(action.type){
        case 'GET_POPULAR_MOVIES':
            return { ...state, popularMovies: action.payload.popularMovies };
        case 'GET_NEW_MOVIES':
            return { ... state, newMovies: action.payload.newMovies };
        case 'GET_UPCOMING_MOVIES':
            return { ...state, upcomingMovies: action.payload.upcomingMovies };
        case 'GET_TOP_RATED_MOVIES':
            return { ...state, topRatedMovies: action.payload.topRatedMovies };
        case 'GET_SEARCH_MOVIES_BY_KEYWORD':
            return { ...state, searchMovies: action.payload.searchMovies };
        case 'GET_MOVIE_BY_ID':
            return { ...state, movieDetails: action.payload.movieDetails };
        case 'GET_TURKEY_MOVIES':
            return { ...state, turkeyMovies: action.payload.turkeyMovies };
        case 'CLEAR_MOVIE_DETAILS':
            return { ...state, movieDetails: {} };
        default:
            return state;
    }
}

export const MovieProvider = ({ children }) => {
    const [movies, dispatch] = useReducer(MovieReducer, { popularMovies:[], newMovies:[], upcomingMovies:[], topRatedMovies:[], searchMovies:[], movieDetails:{}, turkeyMovies:[] });


    const baseUrl = 'https://api.themoviedb.org/3';
    const authToken = 'Bearer xxx';

    const getPopularMovies = () =>{
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: authToken
                }
            };
            
            fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                dispatch({
                    type: 'GET_POPULAR_MOVIES',
                    payload: {
                        popularMovies: res.results
                    }
                })
            })
            .catch(err => console.error(err));
            
            
        } catch (err) {
            console.log(err)
        }
        
    }

    const getNewMovies = () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: authToken
                }
            };
    
            fetch(`${baseUrl}/movie/now_playing?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: 'GET_NEW_MOVIES',
                    payload: {
                        newMovies: res.results
                    }
                });
            })
            .catch(err => console.error(err));
        } catch (err) {
            console.log(err)
        }
    }

    const getUpcomingMovies = () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: authToken
                }
            };

            fetch(`${baseUrl}/movie/upcoming?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type:'GET_UPCOMING_MOVIES',
                    payload:{
                        upcomingMovies: res.results
                    }
                });
            })
            .catch(err => console.error(err));
        } catch (err) {
            console.log(err);
        }
    }

    const getTopRatedMovies = () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: authToken
                }
            };
            fetch(`${baseUrl}/movie/top_rated?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: 'GET_TOP_RATED_MOVIES',
                    payload: {
                        topRatedMovies: res.results
                    }
                });
            })
            .catch(err => console.error(err));
        } catch (err) {
            console.log(err);
        }
    }

    const getMovieById = (movieId) => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: authToken
                }
            };

            fetch(`${baseUrl}/movie/${movieId}?language=tr-TR`, options)
            .then(res => res.json())
            .then(res => {
                if(res && res.title){
                    dispatch({
                        type: 'GET_MOVIE_BY_ID',
                        payload: {
                            movieDetails: res
                        }
                    });
                }
                
            })
            .catch(err => console.error(err));
        } catch (err) {
            console.log(err);
        }
    }

    const getSearchMoviesByKeyword = (query) => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: authToken
                }
            };

            fetch(`${baseUrl}/search/movie?query=${query}&include_adult=false&language=tr-TR&page=1`, options)
            .then(res => res.json())
            .then(res => {
                console.log(`api response: ${res.results}`);
                dispatch({
                    type: 'GET_SEARCH_MOVIES_BY_KEYWORD',
                    payload: {
                        searchMovies: res.results
                    }
                });
            })
            .catch(err => console.error(err));
        } catch (err) {
            console.log(err);
        }
    }

    const getTurkeyMovies = () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: authToken
                }
            };

            fetch(`${baseUrl}/discover/movie?language=tr-TR&page=1&with_original_language=tr`, options)
            .then(res => res.json())
            .then(res => {
                console.log(`api response: ${res.results}`);
                dispatch({
                    type: 'GET_TURKEY_MOVIES',
                    payload: {
                        turkeyMovies: res.results
                    }
                });
            })
            .catch(err => console.error(err));
        } catch (err) {
            console.log(err);
        }
    }

    const clearMovieDetails = () => {
        dispatch({ type: 'CLEAR_MOVIE_DETAILS'});
    }
    return(
        <MovieContext.Provider value={{ 
            popularMovies: movies.popularMovies, 
            getPopularMovies, 
            newMovies: movies.newMovies, 
            getNewMovies, 
            upcomingMovies: movies.upcomingMovies, 
            getUpcomingMovies, 
            topRatedMovies: movies.topRatedMovies, 
            getTopRatedMovies, 
            movieDetails: movies.movieDetails, 
            getMovieById, 
            clearMovieDetails,
            searchMovies: movies.searchMovies,
            getSearchMoviesByKeyword,
            turkeyMovies: movies.turkeyMovies,
            getTurkeyMovies}}>
            { children }
        </MovieContext.Provider>
    );
}

export default MovieContext;