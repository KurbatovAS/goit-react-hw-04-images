import PropTypes from 'prop-types';
import { ImSpinner } from 'react-icons/im';
import s from './ImagePendingView.module.css';

function ImagePendingView({ message }) {
  return (
    <div className={s.ImagePendingViewBox}>
      <ImSpinner size="32" className={s.ImagePendingViewSpinnerIcon} />
      <span className={s.ImagePendingViewText}>{message}</span>
    </div>
  );
}

ImagePendingView.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ImagePendingView;
