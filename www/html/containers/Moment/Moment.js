import React, {Component} from 'react';
import {connect} from 'react-redux';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';
import '../Moments/Moments.less';

class Moment extends Component {
    componentDidMount() {
        let that = this;
        let id = that.props.params.id;
        $.ajax({
            url: 'data/photoDetails.json',
            data: {
                id: id
            }
        }).done((json) => {
            that.setState({
                id: json.id,
                photo: json.photo,
                photographer: json.photographer,
                like: json.like
            });
        }).fail((err) => console.log(err));
    }

    render() {
        return (
            <div className="moments-tree">
                <main className="trunk">
                    {!$.isEmptyObject(this.state) &&
                        <PhotoDetails
                            { ...this.state }
                            />
                    }
                </main>
            </div>
        );
    }
}

export default connect()(Moment);