import PropTypes from 'prop-types';

function LoadMoreBtn({ onButtonClick }) {
  return (
    <div>
      <button className="Button" type="button" onClick={onButtonClick}>
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtn;

LoadMoreBtn.propTypes = {
  onButtonClick: PropTypes.func,
};
