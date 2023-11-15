import PropTypes from "prop-types";

function Button({ text, onClickBtn, customClass }) {
  return (
    <button
      onClick={onClickBtn}
      className={`w-28 h-10 rounded-2xl border border-black grid place-content-center ${customClass}`}
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
