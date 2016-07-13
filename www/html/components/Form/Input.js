import React, {PropTypes} from 'react';

const Input = props => {
    let {
        type,
        placeholder
    } = props;

    return (
        <div className="form-group">
            <div className="input-text">
                <input
                    type={type}
                    placeholder={placeholder}
                    {...props}
                    />
                <i className="input-border"></i>
            </div>
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

export default Input;