import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMoviesList: null,
        popularMoviesList: null,
        topRatedMoviesList: null,
        upComingMoviesList: null,
        trailerVideo: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMoviesList = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMoviesList = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMoviesList = action.payload;
        },
        addUpComingMovies: (state, action) => {
            state.upComingMoviesList = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        }
    },
});

export const { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpComingMovies, addTrailerVideo } = movieSlice.actions;
export default movieSlice.reducer;