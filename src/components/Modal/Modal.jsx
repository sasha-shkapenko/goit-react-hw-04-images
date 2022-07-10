import { Component } from "react";
import s from './Modal.module.css'

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDowne);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDowne);
    }
    handleKeyDowne = e => {
        if (e.code === 'Escape') {
            this.props.onModalClose();
        }
    }
    onBackDropClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onModalClose();
        }
    }
    render() {
        const { openedImg, tags } = this.props;
        return (
            <div className={s.Overlay} onClick={this.onBackDropClick}>
                <div className={s.Modal}>
                    <img src={openedImg} alt={tags} />
                </div>
            </div>
        )
    }
}
