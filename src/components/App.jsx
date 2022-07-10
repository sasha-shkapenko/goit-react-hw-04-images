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
    page: 1,
    query: '',
    showModal: false,
    status: 'idle',
  }
  componentDidUpdate(prevProps, prevState) {
    const { status } = this.state;
    if (prevState.page !== this.state.page || prevState.query !== this.state.query) {
      this.setState({ status: 'pending' });
      fetchData(this.state.query, this.state.page)
        .then(response => {
          this.setState({ images: response.data.hits, status: 'resolved' })
          if (response.ok) {
            this.setState({ images: response.data.hits, status: 'resolved' })
            return;
          }
          return Promise.reject(new Error('Nothing found'));
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
  onImgClick = (openedImg) => {
    this.setState({ openedImg });
    this.toggleModal();
  }

  handleFormSublit = query => {
    this.setState({
      query,
      page: 1,
      images: []
    });
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const { images, page, query, showModal, status, openedImg } = this.state;

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
          <Modal onModalClose={this.toggleModal} openedImg={openedImg}>

          </Modal>)}
        {status === 'resolved' && <Button onClick={this.loadMore} />}

      </div>
    );
  }
};
