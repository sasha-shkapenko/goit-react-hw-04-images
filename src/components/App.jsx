import Searchbar from "./Searchbar";
import { fetchData } from "../API/fetchData";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [images, setImages] = useState([]);
  const [openedImg, setOpenedImg] = useState(null);
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus('pending');
    fetchData(query, page)
      .then(response => {
        if (response.data.hits.length === 0) {
          toast.error('Nothing found!');
          return;
        }
        setImages(state => [...state, ...response.data.hits])
        setTotal(response.data.totalHits);
        setStatus('resolved');

      })
      .catch(error => console.log({ error, status: 'rejected' }))
      .finally(() => { setStatus('resolved') });
  }, [page, query]);

  const toggleModal = () => {
    setShowModal(!showModal);
  }
  const onImgClick = (openedImg, tags) => {
    setOpenedImg(openedImg);
    setTags(tags);
    toggleModal();
  }

  const handleFormSublit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  }
  const loadMore = () => {
    setPage(page + 1);
  }

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSublit}></Searchbar>
      <ToastContainer autoClose={2000} />
      <div>
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <div>{images.total}</div>}

      </div>
      {query && <ImageGallery imgArr={images} onImgClick={onImgClick} />}
      {showModal && (
        <Modal
          onModalClose={toggleModal}
          openedImg={openedImg}
          tags={tags}
        />
      )}
      {status === 'resolved' && images.length > 0 && images.length < total && <Button onClick={loadMore} />}

    </div>
  );
};
