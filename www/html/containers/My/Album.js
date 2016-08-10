import React, {Component} from 'react';
import {Link} from 'react-router';
import PageTitle from '../../components/PageTitle/PageTitle';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import './my.less';

class Album extends Component {
    render() {
        return (
            <div className="my-tree">
                <main className="trunk">
                    <div className="container">
                        <div className="my-album">
                            <PageTitle
                                title="您的摄影集总容量为10张，当前作品数为4张。"
                                subTitle="容量扩充（什么是容量扩充？）"
                                />
                            <div className="row">
                                <div className="col-lg-6">
                                    <figure>
                                        <div className="photo">
                                            <a className="photo-link" href="#">
                                                <img className="img-responsive" src="http://placekitten.com/g/555/400"/>
                                            </a>
                                            <Link className="photo-over" to="/moments/1"><i className="sj sj-magnifier"></i></Link>
                                        </div>
                                        <figcaption>
                                            <span className="like"><i className="sj sj-heart"></i>128</span>
                                            <a className="sj sj-trash del J_Del" href="#"></a>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="col-lg-6">
                                    <figure>
                                        <div className="photo">
                                            <a className="photo-link" href="#">
                                                <img className="img-responsive" src="http://placekitten.com/g/555/400"/>
                                            </a>
                                            <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
                                        </div>
                                        <figcaption>
                                            <span className="like"><i className="sj sj-heart"></i>128</span>
                                            <a className="sj sj-trash del J_Del" href="#"></a>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="col-lg-6">
                                    <figure>
                                        <div className="photo">
                                            <a className="photo-link" href="#">
                                                <img className="img-responsive" src="http://placekitten.com/g/555/400"/>
                                            </a>
                                            <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
                                        </div>
                                        <figcaption>
                                            <span className="like"><i className="sj sj-heart"></i>128</span>
                                            <a className="sj sj-trash del J_Del" href="#"></a>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="col-lg-6">
                                    <figure>
                                        <div className="photo">
                                            <a className="photo-link" href="#">
                                                <img className="img-responsive" src="http://placekitten.com/g/555/400"/>
                                            </a>
                                            <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
                                        </div>
                                        <figcaption>
                                            <span className="like"><i className="sj sj-heart"></i>128</span>
                                            <a className="sj sj-trash del J_Del" href="#"></a>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                            <div className="pagination">
                                <i className="sj sj-end"></i>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
};

export default Album;