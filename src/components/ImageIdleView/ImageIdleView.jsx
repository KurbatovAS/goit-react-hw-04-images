import PropTypes from 'prop-types';
import s from './ImageIdleView.module.css';

function ImageIdleView({ text }) {
  return <p className={s.ImageIdleViewText}>{text}</p>;
}

ImageIdleView.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ImageIdleView;
