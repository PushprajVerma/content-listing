import { createSlice } from '@reduxjs/toolkit'

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

export const { setImageData, setFilteredImages, setCurrentPage, setIsLoading } = movieReducer.actions

export default movieReducer.reducer