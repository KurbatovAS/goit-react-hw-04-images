import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import s from './App.module.css';
import Searchbar from './Searchbar';
import Modal from './Modal';
import imagesAPI from './services';
import ImagePendingView from './ImagePendingView';
import ImageErrorView from './ImageErrorView';
import ImageIdleView from './ImageIdleView';
import ImageResolvedView from './ImageResolvedView';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [tags, setTags] = useState(null);

  function searchHandler(searchQuery, page) {
    setSearchQuery(searchQuery);
    setPage(page);
  }

  useEffect(() => {
    fetchImages();

    function fetchImages() {
      if (!searchQuery) {
        return;
      }

      setLoading(true);

      imagesAPI(searchQuery, page)
        .then(res => {
          if (res.hits.length === 0) {
            setStatus('idle');
            return toast.error(`Нет картинки с именем ${searchQuery}`);
          }

          if (page === 1) {
            setPictures(res.hits);
            setStatus('resolved');
          } else {
            setPictures(prev => [...prev, ...res.hits]);
            setStatus('resolved');
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => {
          setLoading(false);

          if (page > 1) {
            scrollDown();
          }
        });
    }
  }, [searchQuery, page, setPictures]);

  function scrollDown() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  const toggleModal = (modalImg, tags) => {
    setShowModal(prev => !prev);
    setPictureUrl(modalImg);
    setTags(tags);
  };

  if (status === 'idle') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={searchHandler} />
        <ImageIdleView text={'Введите поисковый запрос'} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={searchHandler} />
        <ImagePendingView message={'Loading...'} />
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={searchHandler} />
        <ImageErrorView message={error.message} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={searchHandler} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={pictureUrl} alt={tags} />
          </Modal>
        )}
        <ImageResolvedView
          pictures={pictures}
          loadMore={() => {
            setPage(prev => prev + 1);
          }}
          loading={loading}
          openModal={toggleModal}
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
