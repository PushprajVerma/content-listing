import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducer'

export default configureStore({
  reducer: {
    movies: movieReducer,
  },
  devTools: {
    name: 'Content Listing',
  },
})