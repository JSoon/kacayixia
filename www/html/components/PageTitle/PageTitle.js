import React, {PropTypes} from 'react';

const PageTitle = props => {
    return (
        <div className="title">
            <h1>{props.title}</h1>
            <h4>{props.subTitle}</h4>
        </div>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired
};

export default PageTitle;