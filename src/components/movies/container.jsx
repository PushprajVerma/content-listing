import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from '../../reducer';

import Movies from './Movies'

mapStateToProps = state => {
    const imageData = useSelector((state) => state.movies.imageData);
    const currentPage = useSelector((state) => state.movies.currentPage);

    return {
      imageData,
      currentPage
    };
};

mapDispatchToProps = dispatch => {
    return {
        setImageData: (data) => dispatch(setImageData(data)),
        // setFilteredImages: () => dispatch(setFilteredImages())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);