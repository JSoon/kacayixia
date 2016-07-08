import React, {PropTypes} from 'react';

const Button = props => {
    if (props.type === 'submit') {
        return (
            <button
                type="submit"
                className="btn btn-block">
                {props.text}
            </button>
        );
    }

    return (
        <a
            className="btn btn-block"
            href="javascript:void(0)"
            onClick={props.onClick}>
            {props.text}
        </a>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Button;