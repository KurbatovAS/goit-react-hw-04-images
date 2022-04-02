import PropTypes from 'prop-types';
import nothingGif from './nothing.gif';

function ImageErrorView({ message }) {
  return (
    <>
      <img src={nothingGif} width="320" alt="Nothing here" />
      <p>{message}</p>
    </>
  );
}

ImageErrorView.propType = {
  message: PropTypes.string.isRequired,
};

export default ImageErrorView;
