import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Notiflix from 'notiflix';
import 'react-toastify/dist/ReactToastify.css';

import { BASE_URL, API_KEY, SEARCH_PARAMS } from 'UTILS/constants';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import SpinnerLoader from './Loader/Loader';

class App extends Component {
  state = {
    hits: [],
    name: '',
    page: 1,
    tags: '',
    largeImgURL: '',
    isOpenModal: false,
    error: '',
    visible: false,
  };

  toggleModal = (imageURL, tag, id) => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
      largeImgURL: imageURL,
      tags: tag,
    }));
  };

  getValue = ({ name, page }) => {
    this.setState({ visible: true, error: '' });
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`
        )
        .then(r => {
          if (!r.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          } else if (name === this.state.name) {
            this.setState(state => ({
              hits: [...state.hits, ...r.data.hits],
              name: name,
              page: state.page + 1,
            }));
          } else {
            this.setState(state => ({
              hits: r.data.hits,
              name: name,
              page: state.page + 1,
            }));
          }
        });
    } catch (error) {
      this.setState({ error: error.message });
      console.log(error.message);
    } finally {
      this.setState({
        visible: false,
      });
    }
  };

  loadMore = () => {
    this.getValue(this.state);
  };

  render() {
    const { hits, isOpenModal, visible, largeImgURL, tags, error } = this.state;
    return (
      <div>
        {error && <p>{error}</p>}
        <Searchbar onSubmit={this.getValue} />
        {visible && <SpinnerLoader />}
        {hits && (
          <ImageGallery>
            <ImageGalleryItem articles={hits} onImage={this.toggleModal} />
          </ImageGallery>
        )}

        {isOpenModal && (
          <Modal onClose={this.toggleModal} url={largeImgURL} alt={tags} />
        )}
        {hits.length > 0 && (
          <LoadMoreBtn onButtonClick={() => this.loadMore()} />
        )}

        <ToastContainer autoClose={4000} />
      </div>
    );
  }
}

export default App;
