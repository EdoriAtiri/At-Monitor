import PropTypes from "prop-types";

function Button({ text, onClickBtn, customClass }) {
  return (
    <button
      onClick={onClickBtn}
      className={`grid h-10 w-28 place-content-center rounded-md border border-white font-bold ${customClass}`}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  customClass: PropTypes.string,
  onClickBtn: PropTypes.func,
};

export default Button;
