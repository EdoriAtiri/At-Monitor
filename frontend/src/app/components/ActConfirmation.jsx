import PropTypes from "prop-types";

const ActConfirmation = ({ title, action, onClickBtn, onClickCancel }) => {
  return (
    <div className="absolute left-0 top-0 h-screen w-full">
      <button
        onClick={onClickCancel}
        className="absolute left-0 top-0 z-10 h-screen w-full bg-black opacity-30"
      ></button>
      <div className="card absolute left-1/2 top-1/2 z-20 w-96 -translate-x-1/2 -translate-y-1/2 transform bg-gray-100 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title capitalize">{title}</h2>
          <p className="mb-4 font-semibold">
            Are you sure you want to {action}
          </p>
          <div className="card-actions justify-end">
            <button
              onClick={onClickBtn}
              autoFocus
              className="btn btn-primary uppercase text-white"
            >
              {title}
            </button>
            <button
              onClick={onClickCancel}
              className="btn border border-black uppercase"
            >
              Cancel{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ActConfirmation.propTypes = {
  title: PropTypes.string,
  action: PropTypes.string,
  onClickBtn: PropTypes.func,
  onClickCancel: PropTypes.func,
};

ActConfirmation.defaultProps = {
  title: "Delete",
  action: "delete",
};

export default ActConfirmation;
