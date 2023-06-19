import { configureStore } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import movieReducer from './reducer'

// const store = createStore(
//     movieReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );

// export default store;
export default configureStore({
  reducer: {
    movies: movieReducer,
  },
  devTools: {
    name: 'Your App Name',
  },
})