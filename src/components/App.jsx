import Searchbar from "./Searchbar";
import { fetchData } from "./API/FetchData";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";
import Modal from "./Modal";
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    openedImg: null,
    tags: '',
    page: 1,
    query: '',
    showModal: false,
    status: 'idle',
    total: null,
  }
  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.query !== query) {
      this.setState({ status: 'pending' });
      fetchData(query, page)
        .then(response => {
          if (response.data.hits.length === 0) {
            toast.error('Nothing found!');
            return;
          }
          this.setState({
            images: response.data.hits,
            page: 1,
            status: 'resolved',
            total: response.data.totalHits,
          })
        })
        .catch(error => console.log({ error, status: 'rejected' }))
        .finally(() => { this.setState({ status: 'resolved' }) });
    }
    if (prevState.page !== page) {
      this.setState({ status: 'pending' });
      fetchData(query, page)
        .then(response => {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
          }))
        })
        .catch(error => console.log({ error, status: 'rejected' }))
        .finally(() => { this.setState({ status: 'resolved' }) });
    }

  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }
  onImgClick = (openedImg, tags) => {
    this.setState({ openedImg, tags });
    this.toggleModal();
  }

  handleFormSublit = query => {
    this.setState({
      query,
      page: 1,
      images: []
    });
  }
  loadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const { images, query, showModal, status, openedImg, tags, total } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSublit}></Searchbar>
        <ToastContainer autoClose={2000} />
        <div>
          {status === 'pending' && <Loader />}
          {status === 'resolved' && <div>{images.total}</div>}

        </div>
        {query && <ImageGallery imgArr={images} onImgClick={this.onImgClick} />}
        {showModal && (
          <Modal
            onModalClose={this.toggleModal}
            openedImg={openedImg}
            tags={tags}
          />
        )}
        {status === 'resolved' && images.length > 0 && images.length < total && <Button onClick={this.loadMore} />}

      </div>
    );
  }
};
