import s from './ImageGallery.module.css'
const ImageGalleryItem = ({ imgArr, onImgClick }) => {
    return imgArr.map(({ id, largeImageURL, tags }) => {
        return (
            <li className={s.ImageGalleryItem} key={id}>
                <img onClick={() => { onImgClick(largeImageURL) }} className={s.ImageGalleryItemImage} src={largeImageURL} alt={tags} />
            </li>
        )
    })

}
export default ImageGalleryItem;