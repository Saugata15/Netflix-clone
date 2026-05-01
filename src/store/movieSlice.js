import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMoviesList: null,
        popularMoviesList: null,
        topRatedMoviesList: null,
        upComingMoviesList: null,
        actionMoviesList: null,
        comedyMoviesList: null,

        player: {
            isPlaying: false,
        },

        trailerVideo: null,

        popularTvShows: null,
        topRatedTvShows: null,
        airingTodayTvShows: null,
        onTheAirTvShows: null,
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
        addActionMovies: (state, action) => {
            state.actionMoviesList = action.payload;
        },
        addComedyMovies: (state, action) => {
            state.comedyMoviesList = action.payload;
        },

        playMovie: (state, action) => {
            state.player.isPlaying = true;
        },
        stopMovie: (state) => {
            state.player.isPlaying = false;
        },

        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },

        addPopularTvShows: (state, action) => {
            state.popularTvShows = action.payload;
        },
        addTopRatedTvShows: (state, action) => {
            state.topRatedTvShows = action.payload;
        },
        addAiringTodayTvShows: (state, action) => {
            state.airingTodayTvShows = action.payload;
        },
        addOnTheAirTvShows: (state, action) => {
            state.onTheAirTvShows = action.payload;
        },
    },
});

export const { addNowPlayingMovies, addPopularMovies, addTopRatedMovies,
    addUpComingMovies, addTrailerVideo, addPopularTvShows, addTopRatedTvShows
    , addAiringTodayTvShows, addOnTheAirTvShows, addActionMovies,
    addComedyMovies, playMovie, stopMovie } = movieSlice.actions;

export default movieSlice.reducer;