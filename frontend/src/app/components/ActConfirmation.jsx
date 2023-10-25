import PropTypes from 'prop-types'

const ActConfirmation = ({ title, action, onClickBtn, onClickCancel }) => {
  return (
    <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 card w-96 shadow-2xl bg-gray-100">
      <div className="card-body">
        <h2 className="card-title capitalize">{title}</h2>
        <p>Are you sure you want to {action}</p>
        <div className="card-actions justify-end">
          <button
            onClick={onClickBtn}
            className="btn btn-primary uppercase text-white"
          >
            {title}
          </button>
          <button
            onClick={onClickCancel}
            className="btn border border-black uppercase"
          >
            Cancel{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

ActConfirmation.propTypes = {
  title: PropTypes.string,
  action: PropTypes.string,
  onClickBtn: PropTypes.func,
  onClickCancel: PropTypes.func,
}

ActConfirmation.defaultProps = {
  title: 'Delete',
  action: 'delete',
}

export default ActConfirmation
