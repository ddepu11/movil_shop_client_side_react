import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({
  heading,
  wannaEdit,
  inputValue = '',
  type,
  inputName,
  handleInput,
  refObj,
  spanInnerText,
}) => (
  <div className="row flex">
    <h4>{heading}</h4>
    {wannaEdit ? (
      <div className="flex">
        <input
          value={inputValue}
          type={type}
          name={inputName}
          onChange={handleInput}
        />
        <p ref={refObj} className="message" />
      </div>
    ) : (
      <span>{spanInnerText}</span>
    )}
  </div>
);

FormField.propTypes = {
  heading: PropTypes.string.isRequired,
  wannaEdit: PropTypes.bool.isRequired,
  inputValue: PropTypes.string,
  type: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  refObj: PropTypes.object.isRequired,
  spanInnerText: PropTypes.string,
};

FormField.defaultProps = {
  inputValue: 'XYZ',
  spanInnerText: 'XYZ',
};
export default FormField;