import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, imgSrc, tags, modalImg, openModal }) {
  return (
    <>
      <li
        id={id}
        className={s.ImageGalleryItem}
        onClick={() => {
          openModal(modalImg, tags);
        }}
      >
        <img
          src={imgSrc}
          alt={tags}
          width="200"
          height="150"
          className={s.ImageGalleryItemImage}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalImg: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
