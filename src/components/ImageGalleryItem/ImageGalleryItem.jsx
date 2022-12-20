import PropTypes from 'prop-types';

function ImageGalleryItem({ articles, onImage }) {
  return (
    <>
      {articles.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className="ImageGalleryItem" key={id}>
          <img
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt=""
            onClick={() => onImage(largeImageURL, tags, id)}
          />
        </li>
      ))}
    </>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onImage: PropTypes.func,
};
