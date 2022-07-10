import PropTypes from 'prop-types';
import s from './ImageGallery.module.css'
const ImageGalleryItem = ({ imgArr, onImgClick }) => {
    return imgArr.map(({ id, largeImageURL, tags }) => {
        return (
            <li className={s.ImageGalleryItem} key={id}>
                <img onClick={() => { onImgClick(largeImageURL, tags) }} className={s.ImageGalleryItemImage} src={largeImageURL} alt={tags} />
            </li>
        )
    })

}
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    imgArr: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ).isRequired,
    onImgClick: PropTypes.func.isRequired,
};