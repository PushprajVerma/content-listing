import { createSlice } from '@reduxjs/toolkit'
import { createStore } from 'redux';


export const movieReducer = createSlice({
  name: 'movies',
  initialState: {
    imageData: [],
    filteredImages: [],
    isLoading: false,
    currentPage: 1,
  },
  reducers: {
    setImageData: (state, action) => {
      state.imageData = [...state.imageData, ...action.payload]
    },
    setCurrentPage: (state) => {
      state.currentPage += 1
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setFilteredImages: (state, action) => {
        state.filteredImages = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setImageData, setFilteredImages, setCurrentPage, setIsLoading } = movieReducer.actions

export default movieReducer.reducer

// const initialState = {
//     counter: 0,
//     imageData: [],
//     user: null,
//   };

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'INCREMENT':
//         return {
//           ...state,
//           counter: state.counter + 1,
//         };
//       case 'ADD_TODO':
//         return {
//           ...state,
//           imageData: [...state.imageData, action.payload],
//         };
//       case 'SET_USER':
//         return {
//           ...state,
//           user: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
// export default reducer;