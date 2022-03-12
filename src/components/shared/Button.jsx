import PropTypes from 'prop-types';

function Button({ children, version, type, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: 'primary',
  type: 'submit',
  disabled: false,
};

Button.propTypes = {
  version: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
