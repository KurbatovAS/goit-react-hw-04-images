import {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import imagesAPI from '../services';
import ImagePendingView from '../ImagePendingView';
import ImageErrorView from '../ImageErrorView';
import ImageIdleView from '../ImageIdleView';
import ImageResolvedView from '../ImageResolvedView';

function ImageGallery ({searchQuery}) {
  const [fetchPage, setFetchPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(()=>{
    setStatus('pending');
    setPictures([]);
    fetchImages(searchQuery, fetchPage);
  }, [searchQuery]);

  useEffect(()=>{
    setLoading(true);
    fetchImages(searchQuery, fetchPage);
  }, [fetchPage])
  
  function fetchImages(searchQuery, fetchPage) {
    imagesAPI(searchQuery, fetchPage)
      .then(res => {
        if (res.hits.length === 0) {
          setStatus('idle');
          return toast.error(`Нет картинки с именем ${searchQuery}`);
        }

        if (fetchPage === 1) {
          setPictures(res.hits);
          setStatus('resolved')
        }
        else {      
          setPictures(prev => [...prev, ...res.hits]);
          setStatus('resolved')
        } 
      })
      .catch(error => {
        setError(error);
        setStatus('rejected')        
      })
      .finally(() => {
        setLoading(false);    

        if (fetchPage > 1) {
          scrollDown();
        }
      });
  }

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
      return <ImageIdleView text={'Введите поисковый запрос'} />;
    }

    if (status === 'pending') {
      return <ImagePendingView message={'Loading...'} />;
    }

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={toggleModal}>
              <img src={pictureUrl} alt={tags} />
            </Modal>
          )}
          <ImageResolvedView
            pictures={pictures}
            loadMore={() => {setFetchPage(prev => prev + 1)}}
            loading={loading}
            openModal={toggleModal}
          />
        </>
      );
    }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;