import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../../helper/axios";
import { apiRequests, endpoints, platformTypes } from "../../helper/apirequests";

const initialState = {
    nowPlayingMovies: {
        status:"idle",
        data:null,
        error: null,
    },
    topRated: {
        data: null,
        status: 'idle',
        error: null,
    },
    popular:{
        status:"idle",
        data:null,
        error:null
    }
}
export const fetchNowPlayingMovies = createAsyncThunk(
    'movie/fetchNowPlayingMovies',
    async ()=>{
        const response = await instance.get(apiRequests.getCollection(platformTypes.movie,endpoints.nowPlaying));
        return response.data
    }
)
export const fetchTopRatedMovies = createAsyncThunk('movies/fetchTopRatedMovies', async () => {
    const response = await instance.get(apiRequests.getCollection(platformTypes.movie,endpoints.topRated));
    return response.data;
});
export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies', async ()=>{
    const response = await instance.get(apiRequests.getCollection(platformTypes.movie, endpoints.popular))
    return response.data
})

export const movieSlice = createSlice({
    name:"movie",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchNowPlayingMovies.pending,(state,action)=>{
            state.nowPlayingMovies.status="loading"
        })
        .addCase(fetchNowPlayingMovies.fulfilled,(state,action)=>{
            state.nowPlayingMovies.status="success"
            state.nowPlayingMovies.data=action.payload
        })
        .addCase(fetchNowPlayingMovies.rejected,(state,action)=>{
            state.nowPlayingMovies.status="failed"
            state.nowPlayingMovies.error=action.error
        })
        .addCase(fetchTopRatedMovies.pending, (state) => {
            state.topRated.status = 'loading';
        })
        .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
            state.topRated.status = 'success';
            state.topRated.data = action.payload;
        })
        .addCase(fetchTopRatedMovies.rejected, (state, action) => {
            state.topRated.status = 'failed';
            state.topRated.error = action.error.message;
        })
        .addCase(fetchPopularMovies.pending, (state) => {
            state.popular.status = 'loading';
        })
        .addCase(fetchPopularMovies.fulfilled, (state, action) => {
            state.popular.status = 'success';
            state.popular.data = action.payload;
        })
        .addCase(fetchPopularMovies.rejected, (state, action) => {
            state.popular.status = 'failed';
            state.popular.error = action.error.message;
        });
     }
})
export const selectorNowPlayingMovies=(state)=>state.movie.nowPlayingMovies
export const selectorTopRatedMovies = (state) => state.movie.topRated;
export const selectorPopularMovies = (state) => state.movie.popular;


export default movieSlice.reducer