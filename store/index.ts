import {configureStore,createSlice} from '@reduxjs/toolkit';
export interface watchlistType{
    id: number;
  adult: boolean;
  poster_path: string;
  genres: Array<object>;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
}
 const initialWatclistState: { watchlist: watchlistType[], watchlistCount: number } = {
    watchlist: [],
    watchlistCount: 0
}
const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: initialWatclistState,
    reducers: {
        addMovieToWatchlist(state, {payload}: {payload: watchlistType}) {
            state.watchlist.push(payload);
            state.watchlistCount++;
        },
        removeMovieFromWatchlist(state, action) {
            state.watchlist = state.watchlist.filter(movie => movie.id != action.payload);
            state.watchlistCount--;
        }
    }
});
export const store = configureStore({
    reducer: {
        watchlist: watchlistSlice.reducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { addMovieToWatchlist, removeMovieFromWatchlist } = watchlistSlice.actions;
