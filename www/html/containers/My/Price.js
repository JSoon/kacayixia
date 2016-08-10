import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '../../components/Button/Button';
import Radio from '../../components/Form/Radio'
import './my.less';

class Price extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log(e.target);
        let {router} = this.props;
        router.push('/album');
    }

    render() {
        return (
            <div className="my-tree">
                <main className="trunk">
                    <div className="container">
                        <div className="my-price">
                            <PageTitle
                                title="定价"
                                subTitle="给您的照片贴上价格，方便其他网友购买。"
                                />
                            <form className="row" onSubmit={this.onFormSubmit}>
                                <div className="col-lg-8 col-lg-offset-2">
                                    <div className="row">
                                        <div className="price-img">
                                            <div className="col-lg-6">
                                                <img className="img-responsive" src="http://placekitten.com/g/800/600"/>
                                            </div>
                                            <div className="col-lg-6">
                                                <dl>
                                                    <dt>标清，1200x800 px，5MB</dt>
                                                    <dd>
                                                        <Radio
                                                            radios={
                                                                [
                                                                    {
                                                                        checked: true,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "免费"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "5元"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "10元"
                                                                    }
                                                                ]
                                                            }
                                                            />
                                                    </dd>
                                                    <dt>高清，2500x1600 px，10MB</dt>
                                                    <dd>
                                                        <Radio
                                                            radios={
                                                                [
                                                                    {
                                                                        checked: true,
                                                                        name: "p720",
                                                                        value: "",
                                                                        text: "免费"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p720",
                                                                        value: "",
                                                                        text: "5元"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p720",
                                                                        value: "",
                                                                        text: "10元"
                                                                    }
                                                                ]
                                                            }
                                                            />
                                                    </dd>
                                                    <dt>超清，3500x2400 px，20MB</dt>
                                                    <dd>
                                                        <Radio
                                                            radios={
                                                                [
                                                                    {
                                                                        checked: true,
                                                                        name: "p1080",
                                                                        value: "",
                                                                        text: "免费"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p1080",
                                                                        value: "",
                                                                        text: "5元"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p1080",
                                                                        value: "",
                                                                        text: "10元"
                                                                    }
                                                                ]
                                                            }
                                                            />
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="price-img">
                                            <div className="col-lg-6">
                                                <img className="img-responsive" src="http://placekitten.com/g/800/600"/>
                                            </div>
                                            <div className="col-lg-6">
                                                <dl>
                                                    <dt>标清，1200x800 px，5MB</dt>
                                                    <dd>
                                                        <Radio
                                                            radios={
                                                                [
                                                                    {
                                                                        checked: true,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "免费"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "5元"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p480",
                                                                        value: "",
                                                                        text: "10元"
                                                                    }
                                                                ]
                                                            }
                                                            />
                                                    </dd>
                                                    <dt>高清，2500x1600 px，10MB</dt>
                                                    <dd>
                                                        <Radio
                                                            radios={
                                                                [
                                                                    {
                                                                        checked: true,
                                                                        name: "p720",
                                                                        value: "",
                                                                        text: "免费"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p720",
                                                                        value: "",
                                                                        text: "5元"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p720",
                                                                        value: "",
                                                                        text: "10元"
                                                                    }
                                                                ]
                                                            }
                                                            />
                                                    </dd>
                                                    <dt>超清，3500x2400 px，20MB</dt>
                                                    <dd>
                                                        <Radio
                                                            radios={
                                                                [
                                                                    {
                                                                        checked: true,
                                                                        name: "p1080",
                                                                        value: "",
                                                                        text: "免费"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p1080",
                                                                        value: "",
                                                                        text: "5元"
                                                                    },
                                                                    {
                                                                        checked: false,
                                                                        name: "p1080",
                                                                        value: "",
                                                                        text: "10元"
                                                                    }
                                                                ]
                                                            }
                                                            />
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-lg-offset-4">
                                    <div className="form-group">
                                        <Button type="submit" text="保 存"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default withRouter(Price);