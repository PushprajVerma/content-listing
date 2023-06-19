import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './header.css'
import backButton from '../../image/Back.png'
import searchButton from '../../image/search.png'
import { setFilteredImages } from '../../reducer'

const Header = () => {
    const [search, setSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState(' ')
    const dispatch = useDispatch()
    const imageData = useSelector((state) => state.movies.imageData);

    useEffect(() => {
        const filtered = imageData.filter(image => {
          return image.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    
        dispatch(setFilteredImages(filtered));
      }, [imageData, searchTerm]);
  
    
    const handleSearch = e => {
      setSearchTerm(e.target.value);
    };

    const onSearchIconClick = () => {
        setSearch((preValue) => !preValue)
        setSearchTerm('')
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const renderHeader = () => {
        return (
            <div className='header'>
                <div><img src={backButton} alt="back" className='back'/></div>
                {
                    search ?
                    <input className='search-input' type="text" onChange={(e) => {handleSearch(e)}} placeholder="Search" /> :
                        <div className='header-title'>Romantic Comedy</div>
                }
                <div className='search'>                    
                    <img 
                        src={searchButton}
                        onClick={() => onSearchIconClick()}
                        alt="search"
                        className='search' />
                </div>
            </div>
        )
    }

    return renderHeader()
}

export default Header;