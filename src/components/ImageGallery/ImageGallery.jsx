import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css'

const ImageGallery = ({ imgArr, onImgClick }) => {
    return (
        <ul className={s.ImageGallery}>
            <ImageGalleryItem imgArr={imgArr} onImgClick={onImgClick}></ImageGalleryItem>
        </ul>)
}
export default ImageGallery;