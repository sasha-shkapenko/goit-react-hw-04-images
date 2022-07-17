import { useEffect } from "react";
import s from './Modal.module.css'

export default function Modal({ onModalClose, openedImg, tags }) {
    const onBackDropClick = (e) => {
        if (e.currentTarget === e.target) {
            onModalClose();
        }
    }
    useEffect(() => {
        const handleKeyDowne = e => {
            if (e.code === 'Escape') {
                onModalClose();
            }
        }
        window.addEventListener('keydown', handleKeyDowne);
        return () => {
            window.removeEventListener('keydown', handleKeyDowne);
        }
    }, [onModalClose])


    return (
        <div className={s.Overlay} onClick={onBackDropClick}>
            <div className={s.Modal}>
                <img src={openedImg} alt={tags} />
            </div>
        </div>
    )

}
