import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, selectorNetflixOrginals } from '../features/tv/tvSlice';
import { apiRequests, platformTypes } from '../helper/apirequests';
import { fetchNowPlayingMovies, selectorNowPlayingMovies } from '../features/movie/movieSlice';
import instance from '../helper/axios';
import { shuffle } from '../helper';
import Rows from '../components/layout/Rows';

function Browse(props) {
    const {platform} = useParams()
    const dispatch = useDispatch()
    const {data,status,error} = useSelector(platform==="tv"?selectorNetflixOrginals:selectorNowPlayingMovies)
    const [genresList , setGenresList]= useState(null)

    useEffect(()=>{
        if(platform==="tv"){
            dispatch(fetchNetflixOriginals())
        } else {
            dispatch(fetchNowPlayingMovies())
        }
    },[platform])

    const fetchGenreList = async(platform)=>{
        const response = await instance.get(apiRequests.getGenres(platform))
        setGenresList(shuffle(response.data.genres))
    }
    
    useEffect(()=>{
        if(platform){
            fetchGenreList(platform)
        }
    },[platform])



    return (
        <>
        {
                status === "success" ?
                    < Header video={data.results[Math.floor(Math.random() * data.results.length)]} platform={platform} />
                    : ""
            }
            <div className="px-4 relative -top-32">
                {
                    genresList?.map((genre,index)=>{
                        return (
                            index<6 ?
                            <Rows key={genre?.id} title={genre?.name} genre={genre} platform={platform}/> : null
                        )
                    })
                }
            </div>
        </>
    );
}

export default Browse;