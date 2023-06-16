import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageGrid.css'

const ImageGrid = () => {
  const [imageData, setImageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://test.create.diagnal.com/data/page${currentPage}.json`);
        console.log(response.data.page['content-items'].content)
        setImageData(prevData => [...prevData, ...response.data.page['content-items'].content]);
        // setCurrentPage(prevPage => prevPage + 1);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
      setIsLoading(false);
    };

    if (!isLoading) {
      fetchData();
    }
  }, [currentPage]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ margin: '10px' }}>
      <div className="image-grid">
        {imageData.length > 0 ? (
          imageData.map((image, index) => (
            <div className='images'>
                <img
                    key={index}
                    src={`https://test.create.diagnal.com/images/${image['poster-image']}`}
                    alt={image.title}
                    onError={(e) => e.target.src = "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png"}
                    style={{ width: '80%', height: '80%' }}
                />
                <div>{image.name}</div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
