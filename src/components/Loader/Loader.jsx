import { TailSpin } from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from './Loader.module.css';
const Loader = () => {
    return (<div className={s.Loader}><TailSpin /></div>);
}
export default Loader;