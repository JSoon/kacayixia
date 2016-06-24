import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchDailyPhoto} from '../../actions/dailyPhoto';
import './Home.less';

class Home extends Component {
    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(fetchDailyPhoto());
    }

    render() {
        let {
            photo,
            photographer
        } = this.props;
        return (
            <div className="home-tree">
                <img className="photo-of-today" src={photo.url} title={photo.title} alt={photo.title} />
                <div className="upper">
                    <i className="logo sj sj-logo"></i>
                    <h5 className="slogan">一瞬间，便是永恒。</h5>
                    <Link className="browse" to="/moments">开始浏览</Link>
                </div>
                <div className="lower">
                    <h6 className="caption">每日瞬间</h6>
                    <a className="avatar" href={photographer.url}>
                        <img src={photographer.avatar} title={photographer.name} alt={photographer.name} />
                    </a>
                    <h5 className="username"><a href={photographer.url}>{photographer.name}</a></h5>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    photo: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string
    }).isRequired,
    photographer: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string
    }).isRequired
};

function mapStateToProps(state) {
    let {
        photo,
        photographer
    } = state.dailyPhoto;
    return {
        photo,
        photographer
    }
}

export default connect(mapStateToProps)(Home);