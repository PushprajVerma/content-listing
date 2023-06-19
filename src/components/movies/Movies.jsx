import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { setImageData, setFilteredImages, setIsLoading, setCurrentPage } from '../../reducer'
// import { imageData, filteredImages, isLoading, currentPage } from '../../movieSelector'
import './Movies.css'

const Movies = () => {
  const dispatch = useDispatch()
  const imageData = useSelector((state) => state.movies.imageData);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const filteredImages = useSelector((state) => state.movies.filteredImages);

  // const [imageData, setImageData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setIsLoading(true));
      try {
        const response = await axios.get(`https://test.create.diagnal.com/data/page${currentPage}.json`);
        console.log('response', response.data.page['content-items'].content)
        // setImageData(prevData => [...prevData, ...response.data.page['content-items'].content]);
        dispatch(setImageData(response.data.page['content-items'].content))
        // setCurrentPage(prevPage => prevPage + 1);
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

  // useEffect(() => {
  //     const filtered = imageData.filter(image => {
  //       return image.title.toLowerCase().includes(searchTerm.toLowerCase());
  //     });
  
  //     setFilteredImages(filtered);
  //   }, [imageData, searchTerm]);

  
  // const handleSearch = e => {
  //   setSearchTerm(e.target.value);
  // };

  return (
    // <div style={{ margin: '10px' }}>
      <div className="image-grid">
        {filteredImages?.length > 0 ? (
          filteredImages?.map((image, index) => (
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
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    // </div>
  );
};

export default Movies;
