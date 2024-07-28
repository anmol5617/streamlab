import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, selectorNetflixOrginals } from '../features/tv/tvSlice';
import Header from '../components/layout/Header';
import Rows from '../components/layout/Rows';
import { fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, selectorNowPlayingMovies, selectorPopularMovies, selectorTopRatedMovies } from '../features/movie/movieSlice';
import { platformTypes } from '../helper/apirequests';

function Homescreen(props) {
    const { data, status, error } = useSelector(selectorNetflixOrginals);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNetflixOriginals());
    }, [])

    return (
        <>
            {
                status === "success" ?
                    < Header video={data.results[Math.floor(Math.random() * data.results.length)]} platform={platformTypes.tv} />
                    : ""
            }
            <div className='px-4 relative -top-32'>
                <Rows title="Now Playing Movies" action={fetchNowPlayingMovies} selector={selectorNowPlayingMovies} platform={platformTypes.movie} />
                <Rows title="Netflix Originals" action={fetchNetflixOriginals} selector={selectorNetflixOrginals} platform={platformTypes.tv}/>
                <Rows title="Top Rated Movies" action={fetchTopRatedMovies} selector={selectorTopRatedMovies} platform={platformTypes.movie} />
                <Rows title="Popular Movies" action={fetchPopularMovies} selector={selectorPopularMovies} platform={platformTypes.movie}/>
                
            </div>
        </>
    );
}

export default Homescreen;