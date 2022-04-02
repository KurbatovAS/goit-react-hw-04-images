import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import ImagePendingView from '../ImagePendingView';
import Button from '../Button';
import s from './ImageResolvedView.module.css';

function ImageResolvedView({ pictures, loadMore, loading, openModal }) {
  return (
    <>
      <ul className={s.ImageGallery}>
        {pictures.map(picture => (
          <ImageGalleryItem
            key={picture.id}
            id={picture.id}
            imgSrc={picture.webformatURL}
            tags={picture.tags}
            modalImg={picture.largeImageURL}
            openModal={openModal}
          />
        ))}
      </ul>
      {loading && <ImagePendingView message={'Loading...'} />}
      {pictures.length >= 1 && !loading && <Button onClick={loadMore} />}
    </>
  );
}

ImageResolvedView.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  loadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageResolvedView;
