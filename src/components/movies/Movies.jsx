import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { setImageData, setFilteredImages, setIsLoading, setCurrentPage } from '../../reducer'
import './Movies.css'

const Movies = () => {
  const dispatch = useDispatch()
  const imageData = useSelector((state) => state.movies.imageData);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const filteredImages = useSelector((state) => state.movies.filteredImages);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setIsLoading(true));
      try {
        const response = await axios.get(`https://test.create.diagnal.com/data/page${currentPage}.json`);
        dispatch(setImageData(response.data.page['content-items'].content))
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
      dispatch(setIsLoading(false));
    };

    if (!isLoading) {
      fetchData();
    }
  }, [currentPage]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      dispatch(setCurrentPage());
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    {filteredImages?.length > 0 ? (
      <div className="image-grid">
          {filteredImages?.map((image, index) => (
            <div className='images'>
                <img
                    key={index}
                    src={`https://test.create.diagnal.com/images/${image['poster-image']}`}
                    alt={image.title}
                    onError={(e) => e.target.src = "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png"}
                    className='thumbnail'
                />
                <div>{image.name}</div>
            </div>
          ))}
      </div>) : <div className='no-result'>No results found</div>}
    </>
  );
};

export default Movies;
