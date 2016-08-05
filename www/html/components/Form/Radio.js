import React, {Component, PropTypes} from 'react';

const Radio = (props) => {
    let {
        text,
        name,
        value,
        checked
    } = props;

    let checkedClass = checked ? 'sj-radio-checked' : 'sj-unchecked';

    return (
        <label className="radio-inline">
            <i className={"sj " + checkedClass}><input type="radio" name={name} value={value}/></i>{text}
        </label>
    );
};

Radio.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool
};

export default Radio;