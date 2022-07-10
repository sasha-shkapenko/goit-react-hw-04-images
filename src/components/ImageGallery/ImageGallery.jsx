import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css'

const ImageGallery = ({ imgArr, onImgClick }) => {
    return (
        <ul className={s.ImageGallery}>
            <ImageGalleryItem imgArr={imgArr} onImgClick={onImgClick}></ImageGalleryItem>
        </ul>)
}
export default ImageGallery;

ImageGallery.propTypes = {
    imgArr: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ).isRequired,
    onImgClick: PropTypes.func.isRequired,
};